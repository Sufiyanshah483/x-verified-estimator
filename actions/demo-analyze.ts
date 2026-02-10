'use server';

import { AnalysisResult } from '@/components/results-dashboard';

// Demo mode with sample data
export async function analyzeDemoScreenshot(): Promise<AnalysisResult> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Generate random values for variety
    const baseImpressions = Math.floor(Math.random() * (2500000 - 500000) + 500000);
    const baseEngagements = Math.floor(baseImpressions * (Math.random() * (0.05 - 0.02) + 0.02));

    const vImpMin = Math.floor(baseImpressions * (Math.random() * (0.05 - 0.03) + 0.03));
    const vImpMax = Math.floor(baseImpressions * (Math.random() * (0.12 - 0.08) + 0.08));
    const vEngMin = Math.floor(baseEngagements * (Math.random() * (0.10 - 0.07) + 0.07));
    const vEngMax = Math.floor(baseEngagements * (Math.random() * (0.20 - 0.15) + 0.15));

    const vImpAvg = (vImpMin + vImpMax) / 2;
    const nonVerifiedImp = baseImpressions - vImpAvg;

    return {
        verifiedImpressions: { min: vImpMin, max: vImpMax },
        nonVerifiedImpressions: Math.round(nonVerifiedImp),
        verifiedEngagements: { min: vEngMin, max: vEngMax },
        verifiedImpressionPercentage: Number(((vImpAvg / baseImpressions) * 100).toFixed(1)),
        confidenceScore: Math.random() > 0.3 ? 'High' : 'Medium',
        timeRange: ['Last 28 days', 'Last 7 days', 'September 2023', 'August 2023'][Math.floor(Math.random() * 4)],
        retentionRate: Number((Math.random() * (5.5 - 1.5) + 1.5).toFixed(1)),
        raw: {
            impressions: baseImpressions,
            engagements: baseEngagements
        }
    };
}
