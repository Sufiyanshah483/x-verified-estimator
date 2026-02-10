'use server';

import OpenAI from 'openai';
import { z } from 'zod';

// Helper to get OpenAI client safely
function getOpenAIClient() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) return null;
    return new OpenAI({ apiKey });
}

const AnalysisSchema = z.object({
    totalImpressions: z.number(),
    totalEngagements: z.number(),
    timeRange: z.string(),
    retentionRate: z.number().optional(), // Often listed as Engagement Rate in screenshots
});

interface AnalysisResult {
    verifiedImpressions: { min: number; max: number };
    nonVerifiedImpressions: number;
    verifiedEngagements: { min: number; max: number };
    verifiedImpressionPercentage: number;
    confidenceScore: 'Low' | 'Medium' | 'High';
    timeRange: string;
    retentionRate: number;
    raw?: {
        impressions: number;
        engagements: number;
    };
    error?: string;
}

export async function analyzeScreenshot(formData: FormData): Promise<AnalysisResult> {
    const file = formData.get('image') as File;
    const username = formData.get('username') as string;

    if (!file || !username) {
        return {
            verifiedImpressions: { min: 0, max: 0 },
            nonVerifiedImpressions: 0,
            verifiedEngagements: { min: 0, max: 0 },
            verifiedImpressionPercentage: 0,
            confidenceScore: 'Low',
            timeRange: '',
            retentionRate: 0,
            error: "Missing file or username"
        };
    }

    try {
        // Convert file to base64
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64Image = buffer.toString('base64');
        const dataUrl = `data:${file.type};base64,${base64Image}`;

        // Call OpenAI Vision
        const client = getOpenAIClient();
        if (!client) {
            throw new Error("API key is not configured");
        }

        const response = await client.chat.completions.create({
            model: "gpt-4o", // Using gpt-4o for best vision performance
            messages: [
                {
                    role: "system",
                    content: ` Analyze the provided screenshot and extract the specific metrics: Total Impressions, Total Engagements, and Engagement Rate (which we will use as Retention Rate).
          Also identify the Time Range (e.g., "Last 28 days", "Sep 2023", etc.).
          
          Return ONLY a valid JSON object with no markdown formatting:
          {
            "totalImpressions": number,
            "totalEngagements": number,
            "timeRange": string,
            "retentionRate": number (extract from Engagement Rate percentage if available, otherwise 0)
          }`
                },
                {
                    role: "user",
                    content: [
                        { type: "text", text: "Analyze this X analytics screenshot." },
                        {
                            type: "image_url",
                            image_url: {
                                url: dataUrl,
                                detail: "high"
                            },
                        },
                    ],
                },
            ],
            max_tokens: 300,
        });

        const content = response.choices[0].message.content;
        if (!content) throw new Error("No response from AI");

        // Clean and parse JSON
        const cleanContent = content.replace(/```json/g, '').replace(/```/g, '').trim();
        const extractedData = JSON.parse(cleanContent);
        const parsed = AnalysisSchema.parse(extractedData);

        // Heuristic Logic with dynamic jitter to ensure results are never identical
        const jitter = () => (Math.random() * (1.15 - 0.85) + 0.85); // +/- 15% variance

        // Heuristic 1: Verified users account for ~4-9% of impressions on average
        const impressionMinPct = 0.04 * jitter();
        const impressionMaxPct = 0.09 * jitter();

        // Heuristic 2: Verified users account for ~8-15% of engagements
        const engagementMinPct = 0.08 * jitter();
        const engagementMaxPct = 0.15 * jitter();

        // Apply multipliers
        const vImpMin = Math.round(parsed.totalImpressions * impressionMinPct);
        const vImpMax = Math.round(parsed.totalImpressions * impressionMaxPct);

        const vEngMin = Math.round(parsed.totalEngagements * engagementMinPct);
        const vEngMax = Math.round(parsed.totalEngagements * engagementMaxPct);

        // Calculate percentage for UI
        const avgImpPct = parsed.totalImpressions > 0
            ? ((vImpMin + vImpMax) / 2 / parsed.totalImpressions) * 100
            : 0;

        // Determine Confidence Score
        // If OCR numbers are very round (e.g. 1000) or very low, confidence might be lower
        // If image quality was low (detail: high requested), we assume high for now.
        // Real implementation would allow GPT to return confidence.
        let confidence: 'Low' | 'Medium' | 'High' = 'High';
        if (parsed.totalImpressions < 100 || parsed.totalEngagements < 10) confidence = 'Low';

        // Calculate Non-Verified Impressions
        const vImpAvg = (vImpMin + vImpMax) / 2;
        const nonVerifiedImp = Math.max(0, parsed.totalImpressions - vImpAvg);

        return {
            verifiedImpressions: { min: vImpMin, max: vImpMax },
            nonVerifiedImpressions: Math.round(nonVerifiedImp),
            verifiedEngagements: { min: vEngMin, max: vEngMax },
            verifiedImpressionPercentage: Number(avgImpPct.toFixed(1)),
            confidenceScore: confidence,
            timeRange: parsed.timeRange,
            retentionRate: parsed.retentionRate || 0,
            raw: {
                impressions: parsed.totalImpressions,
                engagements: parsed.totalEngagements
            }
        };

    } catch (error) {
        console.error("Analysis Error Details:", {
            error,
            message: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined,
            apiKeyExists: !!process.env.OPENAI_API_KEY,
            apiKeyLength: process.env.OPENAI_API_KEY?.length || 0
        });

        let errorMessage = "Failed to analyze image. ";

        if (!process.env.OPENAI_API_KEY) {
            errorMessage = "OpenAI API key is not configured. Please add OPENAI_API_KEY to your .env.local file.";
        } else if (error instanceof Error) {
            if (error.message.includes('API key')) {
                errorMessage = "Invalid OpenAI API key. Please check your API key in .env.local or Vercel environment variables.";
            } else if (error.message.includes('rate limit')) {
                errorMessage = "OpenAI API rate limit exceeded. Please try again in a moment.";
            } else if (error.message.includes('timeout')) {
                errorMessage = "Request timed out. Please try again.";
            } else {
                errorMessage += error.message;
            }
        } else {
            errorMessage += "Please ensure it's a clear screenshot of X analytics.";
        }

        return {
            verifiedImpressions: { min: 0, max: 0 },
            nonVerifiedImpressions: 0,
            verifiedEngagements: { min: 0, max: 0 },
            verifiedImpressionPercentage: 0,
            confidenceScore: 'Low',
            timeRange: 'N/A',
            retentionRate: 0,
            error: errorMessage
        };
    }
}
