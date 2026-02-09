'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { CheckCircle2, AlertTriangle, Info, Download, TrendingUp, Users, Eye, Heart, BarChart3, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AnalysisResult {
    verifiedImpressions: { min: number; max: number };
    verifiedEngagements: { min: number; max: number };
    verifiedImpressionPercentage: number;
    confidenceScore: 'Low' | 'Medium' | 'High';
    timeRange: string;
    raw?: {
        impressions: number;
        engagements: number;
    };
    error?: string;
}

interface ResultsDashboardProps {
    data: AnalysisResult;
    username: string;
    onReset: () => void;
}

export function ResultsDashboard({ data, username, onReset }: ResultsDashboardProps) {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const formatNumber = (num: number) => {
        return new Intl.NumberFormat('en-US', { notation: "compact", maximumFractionDigits: 1 }).format(num);
    };

    const formatCurrency = (num: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
    };

    // Show error state if present
    if (data.error) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-2xl mx-auto"
            >
                <div className="p-8 rounded-3xl border border-red-200 bg-red-50 shadow-lg">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-full bg-red-100">
                            <AlertTriangle className="size-8 text-red-600" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-900">Analysis Failed</h3>
                            <p className="text-red-700/60">{data.error}</p>
                        </div>
                    </div>
                    <button
                        onClick={onReset}
                        className="mt-6 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white transition-all shadow-lg"
                    >
                        Try Again
                    </button>
                </div>
            </motion.div>
        );
    }

    const totalImpressions = data.raw?.impressions || 0;
    const totalEngagements = data.raw?.engagements || 0;
    const verifiedImpAvg = (data.verifiedImpressions.min + data.verifiedImpressions.max) / 2;
    const verifiedEngAvg = (data.verifiedEngagements.min + data.verifiedEngagements.max) / 2;
    const nonVerifiedImpressions = totalImpressions - verifiedImpAvg;
    const nonVerifiedEngagements = totalEngagements - verifiedEngAvg;

    const engagementRate = totalImpressions > 0 ? (totalEngagements / totalImpressions) * 100 : 0;
    const verifiedEngagementRate = verifiedImpAvg > 0 ? (verifiedEngAvg / verifiedImpAvg) * 100 : 0;
    const growthPercentage = verifiedEngagementRate - engagementRate;

    const payoutFactor = 8.50 / 5000000;
    const expectedPayoutMin = data.verifiedImpressions.min * payoutFactor;
    const expectedPayoutMax = data.verifiedImpressions.max * payoutFactor;
    const expectedPayoutAvg = verifiedImpAvg * payoutFactor;

    return (
        <div className="w-full max-w-6xl mx-auto space-y-10 pb-20">

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row md:items-end justify-between gap-6"
            >
                <div>
                    <div className="h-1.5 w-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-4" />
                    <h2 className="text-5xl font-black text-slate-900 tracking-tight leading-tight">
                        Verified <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Payload</span>
                    </h2>
                    <p className="text-slate-500 mt-2 text-lg font-medium">Detailed impact assessment for <span className="text-blue-600 font-bold">@{username}</span></p>
                </div>
                <button
                    onClick={onReset}
                    className="px-8 py-3 rounded-2xl bg-white hover:bg-slate-50 text-slate-900 transition-all border border-slate-200 font-bold shadow-sm hover:shadow-md hover:scale-105 active:scale-95"
                >
                    New Analysis
                </button>
            </motion.div>

            {/* Payout & Growth Highlights */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Expected Payout Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="lg:col-span-2"
                >
                    <div className="relative group overflow-hidden rounded-3xl p-8 bg-white border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
                        <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                            <BarChart3 size={160} className="text-slate-900" />
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 rounded-2xl bg-blue-50">
                                    <TrendingUp className="size-8 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Estimated Ad Revenue</h3>
                                    <p className="text-slate-600 text-xs font-medium">Based on 5M verified impressions payout model</p>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row md:items-end gap-x-12 gap-y-6">
                                <div>
                                    <p className="text-7xl font-black text-slate-900 tracking-tighter">
                                        {formatCurrency(expectedPayoutAvg)}
                                    </p>
                                    <p className="text-slate-500 mt-1 font-medium text-lg">
                                        Estimated range: <span className="text-slate-900 font-bold">{formatCurrency(expectedPayoutMin)} - {formatCurrency(expectedPayoutMax)}</span>
                                    </p>
                                </div>
                                <div className="space-y-4 flex-1 max-w-xs">
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs font-bold uppercase tracking-tighter text-slate-400">
                                            <span>Revenue Potential</span>
                                            <span className="text-blue-600">{data.confidenceScore} Confidence</span>
                                        </div>
                                        <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: data.confidenceScore === 'High' ? '85%' : data.confidenceScore === 'Medium' ? '60%' : '35%' }}
                                                transition={{ duration: 1.5, delay: 0.5 }}
                                                className="h-full bg-gradient-to-r from-blue-600 to-indigo-600"
                                            />
                                        </div>
                                    </div>
                                    <p className="text-[10px] text-slate-400 leading-tight italic">
                                        *Estimates assume current ad revenue share rates and verified impression density.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Efficiency Score */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="rounded-3xl p-8 bg-emerald-50 border border-emerald-100 h-full flex flex-col justify-between shadow-sm">
                        <div>
                            <div className="p-3 rounded-2xl bg-white shadow-sm w-fit mb-6">
                                <ShieldCheck className="size-8 text-emerald-600" />
                            </div>
                            <h3 className="text-sm font-bold text-emerald-800/60 uppercase tracking-widest mb-2">Verified Boost</h3>
                            <p className="text-5xl font-black text-emerald-600 tracking-tighter">
                                +{growthPercentage.toFixed(1)}%
                            </p>
                        </div>
                        <div className="mt-8 pt-8 border-t border-emerald-200">
                            <p className="text-sm text-emerald-800/70 font-medium">
                                Your content is <span className="text-emerald-600 font-black">{(verifiedEngagementRate / engagementRate).toFixed(1)}x</span> more effective with verified users compared to the general audience.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Main Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">

                {/* Verified Impressions Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    whileHover={{ translateY: -5 }}
                    className="relative group"
                >
                    <div className="rounded-3xl p-8 border border-slate-200 bg-white h-full relative overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 blur-2xl" />

                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100">
                                <Eye className="size-7 text-blue-600" />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Verified Impressions</h3>
                        </div>

                        <div className="space-y-8 text-slate-900">
                            <div>
                                <p className="text-6xl font-black tracking-tighter">
                                    {formatNumber(verifiedImpAvg)}
                                </p>
                                <p className="text-sm font-bold text-blue-600 mt-2 bg-blue-50 w-fit px-3 py-1 rounded-full">
                                    Range: {formatNumber(data.verifiedImpressions.min)} — {formatNumber(data.verifiedImpressions.max)}
                                </p>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between items-end">
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Impression Density</span>
                                    <span className="text-xl font-black text-blue-600">{data.verifiedImpressionPercentage}%</span>
                                </div>
                                <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden p-1">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${data.verifiedImpressionPercentage}%` }}
                                        transition={{ duration: 1.2, delay: 0.8 }}
                                        className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Verified Engagements Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ translateY: -5 }}
                    className="relative group"
                >
                    <div className="rounded-3xl p-8 border border-slate-200 bg-white h-full relative overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-full -mr-16 -mt-16 blur-2xl" />

                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-4 rounded-2xl bg-purple-50 border border-purple-100">
                                <Heart className="size-7 text-purple-600" />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Verified Engagement</h3>
                        </div>

                        <div className="space-y-8 text-slate-900">
                            <div>
                                <p className="text-6xl font-black tracking-tighter">
                                    {formatNumber(verifiedEngAvg)}
                                </p>
                                <p className="text-sm font-bold text-purple-600 mt-2 bg-purple-50 w-fit px-3 py-1 rounded-full">
                                    Interactions: {formatNumber(data.verifiedEngagements.min)} — {formatNumber(data.verifiedEngagements.max)}
                                </p>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <div className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-widest">
                                    High Quality Reach
                                </div>
                                <div className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-widest">
                                    {data.timeRange}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Breakdown & Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Visual Data Breakdown */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <div className="p-8 h-full bg-white rounded-3xl border border-slate-200 shadow-sm">
                        <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3 tracking-tight">
                            <span className="h-6 w-1.5 bg-blue-600 rounded-full" />
                            Volume Distribution
                        </h3>

                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 group transition-colors">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Impressions</p>
                                    <p className="text-3xl font-black text-slate-900">{formatNumber(totalImpressions)}</p>
                                    <div className="mt-4 h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-600 w-full opacity-30" />
                                    </div>
                                </div>
                                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 group transition-colors">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Engagements</p>
                                    <p className="text-3xl font-black text-slate-900">{formatNumber(totalEngagements)}</p>
                                    <div className="mt-4 h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-purple-600 w-full opacity-30" />
                                    </div>
                                </div>
                                <div className="p-5 rounded-2xl bg-slate-50/50 border border-slate-100/50">
                                    <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mb-1">Non-Verified Reach</p>
                                    <p className="text-2xl font-bold text-slate-400">{formatNumber(nonVerifiedImpressions)}</p>
                                </div>
                                <div className="p-5 rounded-2xl bg-slate-50/50 border border-slate-100/50">
                                    <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mb-1">Non-Verified Eng.</p>
                                    <p className="text-2xl font-bold text-slate-400">{formatNumber(nonVerifiedEngagements)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Accuracy & Methodology */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <div className="p-8 h-full bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden relative">
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-slate-50 rounded-full -mb-32 -mr-32 blur-3xl opacity-50" />

                        <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3 tracking-tight">
                            <span className="h-6 w-1.5 bg-indigo-600 rounded-full" />
                            Methodology
                        </h3>

                        <div className="space-y-6 text-slate-500 relative z-10 font-medium">
                            <p className="text-base leading-relaxed">
                                To estimate <span className="text-slate-900 font-bold">Verified Reach</span>, we simulate X's core heuristic: filtering impressions from accounts with active blue-check badges.
                            </p>

                            <ul className="space-y-3">
                                {[
                                    { label: 'Impression Weight', val: '4% — 9%', color: 'text-blue-600', bg: 'bg-blue-50' },
                                    { label: 'Engagement Weight', val: '8% — 15%', color: 'text-purple-600', bg: 'bg-purple-50' },
                                    { label: 'V-RPM (Revenue)', val: '$1.70 / 1M', color: 'text-emerald-600', bg: 'bg-emerald-50' }
                                ].map((item, idx) => (
                                    <li key={idx} className={cn("flex items-center justify-between p-3.5 rounded-2xl border border-slate-50", item.bg)}>
                                        <span className="text-xs font-bold uppercase tracking-widest opacity-60">{item.label}</span>
                                        <span className={cn("font-black text-lg", item.color)}>{item.val}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="flex items-start gap-3 p-4 rounded-2xl bg-amber-50 border border-amber-100 mt-4">
                                <AlertTriangle className="size-5 text-amber-600 shrink-0 mt-0.5" />
                                <p className="text-[11px] leading-tight text-amber-800 font-bold uppercase tracking-tight">
                                    Unofficial data science projections based on creator correlations. Not affiliated with X Corp.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Actions */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-10 print:hidden"
            >
                <button
                    onClick={() => window.print()}
                    className="group flex items-center gap-3 px-10 py-5 rounded-3xl bg-slate-900 text-white font-black tracking-tight shadow-xl shadow-slate-900/10 transition-all hover:scale-105 active:scale-95"
                >
                    <Download className="size-5" />
                    Export Report
                </button>
                <button
                    className="flex items-center gap-3 px-10 py-5 rounded-3xl bg-white text-slate-900 border border-slate-200 font-black tracking-tight shadow-sm hover:shadow-md transition-all hover:scale-105 active:scale-95"
                >
                    <Users className="size-5" />
                    Share Results
                </button>
            </motion.div>

        </div>
    );
}
