'use server';

import { AnalysisResult } from '@/components/results-dashboard';

// Demo mode with sample data
export async function analyzeDemoScreenshot(): Promise<AnalysisResult> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    return {
        verifiedImpressions: { min: 45000, max: 108000 },
        nonVerifiedImpressions: 1092000,
        verifiedEngagements: { min: 3600, max: 6750 },
        verifiedImpressionPercentage: 6.5,
        confidenceScore: 'High',
        timeRange: 'Last 28 days',
        retentionRate: 3.8,
        raw: {
            impressions: 1200000,
            engagements: 45000
        }
    };
}
