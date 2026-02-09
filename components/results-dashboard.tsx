'use client';

import React from 'react';
import { GlassCard } from '@/components/ui/glass-card';
import { CheckCircle2, AlertTriangle, Info, Download, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AnalysisResult {
    verifiedImpressions: { min: number; max: number };
    verifiedEngagements: { min: number; max: number };
    verifiedImpressionPercentage: number;
    confidenceScore: 'Low' | 'Medium' | 'High';
    timeRange: string;
}

interface ResultsDashboardProps {
    data: AnalysisResult;
    username: string;
    onReset: () => void;
}

export function ResultsDashboard({ data, username, onReset }: ResultsDashboardProps) {
    const [showExplanation, setShowExplanation] = React.useState(false);

    const formatNumber = (num: number) => {
        return new Intl.NumberFormat('en-US', { notation: "compact", maximumFractionDigits: 1 }).format(num);
    };

    return (
        <div className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">

            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-white">Analysis Results</h2>
                    <p className="text-gray-400">Estimated verified impact for <span className="text-blue-400">@{username}</span></p>
                </div>
                <button
                    onClick={onReset}
                    className="text-sm text-gray-500 hover:text-white transition-colors"
                >
                    Analyze another
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Verified Impressions Card */}
                <GlassCard className="p-6 border-blue-500/30 bg-blue-500/5">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                            <Info className="size-5" />
                        </div>
                        <h3 className="text-lg font-semibold text-white">Verified Impressions</h3>
                    </div>

                    <div className="flex items-end gap-2 mb-2">
                        <span className="text-4xl font-bold text-white">
                            {formatNumber(data.verifiedImpressions.min)} - {formatNumber(data.verifiedImpressions.max)}
                        </span>
                    </div>
                    <p className="text-sm text-blue-200/60">
                        Estimated views from verified accounts (~{data.verifiedImpressionPercentage}% of total)
                    </p>

                    {/* Progress bar visual */}
                    <div className="mt-6 h-2 w-full bg-white/10 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full"
                            style={{ width: `${data.verifiedImpressionPercentage}%` }}
                        />
                    </div>
                </GlassCard>

                {/* Verified Engagements Card */}
                <GlassCard className="p-6 border-purple-500/30 bg-purple-500/5">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                            <CheckCircle2 className="size-5" />
                        </div>
                        <h3 className="text-lg font-semibold text-white">Verified Engagements</h3>
                    </div>

                    <div className="flex items-end gap-2 mb-2">
                        <span className="text-4xl font-bold text-white">
                            {formatNumber(data.verifiedEngagements.min)} - {formatNumber(data.verifiedEngagements.max)}
                        </span>
                    </div>
                    <p className="text-sm text-purple-200/60">
                        Estimated likes, replies, and reposts from verified users
                    </p>

                    <div className="mt-6 flex gap-2">
                        <span className="px-2 py-1 rounded bg-purple-500/20 text-purple-300 text-xs">
                            High Quality
                        </span>
                        <span className="px-2 py-1 rounded bg-blue-500/20 text-blue-300 text-xs">
                            {data.timeRange}
                        </span>
                    </div>
                </GlassCard>
            </div>

            {/* Confidence & Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <GlassCard className="p-6 flex flex-col justify-between">
                    <div>
                        <h4 className="text-sm font-medium text-gray-400 mb-1">Confidence Score</h4>
                        <div className={cn(
                            "text-2xl font-bold",
                            data.confidenceScore === 'High' ? "text-green-400" :
                                data.confidenceScore === 'Medium' ? "text-yellow-400" : "text-red-400"
                        )}>
                            {data.confidenceScore}
                        </div>
                    </div>
                    <div className="mt-4 text-xs text-gray-500">
                        Based on image clarity and data consistency.
                    </div>
                </GlassCard>

                <div className="md:col-span-2">
                    <GlassCard className="p-0 overflow-hidden">
                        <button
                            onClick={() => setShowExplanation(!showExplanation)}
                            className="w-full flex items-center justify-between p-6 hover:bg-white/5 transition-colors text-left"
                        >
                            <span className="font-semibold text-white">How was this estimated?</span>
                            {showExplanation ? <ChevronUp className="size-5 text-gray-400" /> : <ChevronDown className="size-5 text-gray-400" />}
                        </button>

                        {showExplanation && (
                            <div className="px-6 pb-6 pt-0 text-sm text-gray-400 space-y-3 animate-in fade-in slide-in-from-top-2">
                                <p>
                                    We use a heuristic model developed from analyzing public engagement patterns.
                                    Verified users typically account for <strong>3-8%</strong> of total impressions on high-performing tweets,
                                    buoyed by algorithmic prioritization.
                                </p>
                                <p>
                                    Engagement estimates apply a weighted multiplier to your total engagement metrics,
                                    assuming verified users are <strong>1.5x</strong> more likely to engage due to visibility incentives.
                                </p>
                                <div className="flex items-center gap-2 mt-4 text-yellow-500/80 bg-yellow-500/10 p-3 rounded-lg border border-yellow-500/20">
                                    <AlertTriangle className="size-4 shrink-0" />
                                    <span className="text-xs">
                                        These are unofficial estimates. Actual verified data is private to X Premium users.
                                    </span>
                                </div>
                            </div>
                        )}
                    </GlassCard>
                </div>
            </div>

            <div className="flex justify-center pt-8 print:hidden">
                <button
                    onClick={() => window.print()}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all border border-white/10"
                >
                    <Download className="size-4" />
                    Download PDF Report
                </button>
            </div>

        </div>
    );
}
