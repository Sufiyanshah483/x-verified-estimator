'use server';

import { AnalysisResult } from '@/components/results-dashboard';

// Demo mode with randomized sample data
export async function analyzeDemoScreenshot(): Promise<AnalysisResult> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Randomize total impressions between 500k and 5M
    const totalImpressions = Math.floor(Math.random() * (5000000 - 500000 + 1)) + 500000;

    // Randomize engagement rate between 2.5% and 5%
    const engagementRateOffset = (Math.random() * 0.025) + 0.025;
    const totalEngagements = Math.floor(totalImpressions * engagementRateOffset);

    // Verified metrics (usually 4-9% of total)
    const verifiedImpPct = (Math.random() * 0.05) + 0.04;
    const verifiedEngPct = (Math.random() * 0.07) + 0.08;

    const vImpAvg = totalImpressions * verifiedImpPct;
    const vEngAvg = totalEngagements * verifiedEngPct;

    return {
        verifiedImpressions: {
            min: Math.floor(vImpAvg * 0.8),
            max: Math.floor(vImpAvg * 1.2)
        },
        verifiedEngagements: {
            min: Math.floor(vEngAvg * 0.8),
            max: Math.floor(vEngAvg * 1.2)
        },
        verifiedImpressionPercentage: Number((verifiedImpPct * 100).toFixed(1)),
        confidenceScore: Math.random() > 0.3 ? 'High' : 'Medium',
        timeRange: 'Last 28 days',
        raw: {
            impressions: totalImpressions,
            engagements: totalEngagements
        }
    };
}
