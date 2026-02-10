'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { CheckCircle2, AlertTriangle, Info, Download, TrendingUp, Users, Eye, Heart, BarChart3, ShieldCheck, Zap } from 'lucide-react';
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
                <div className="p-8 border-4 border-black bg-white shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-4 bg-red-400 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <AlertTriangle className="size-10 text-black fill-white" />
                        </div>
                        <div>
                            <h3 className="text-3xl font-black text-black uppercase italic">Analysis Failed!</h3>
                            <p className="text-black font-bold text-lg">{data.error}</p>
                        </div>
                    </div>
                    <button
                        onClick={onReset}
                        className="w-full py-4 bg-black text-white font-black text-xl uppercase italic border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] active:translate-y-[2px] transition-all"
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

    // Celebration effect items
    const confettiColors = ['#fde047', '#60a5fa', '#4ade80', '#f472b6', '#c084fc'];

    return (
        <div className="w-full max-w-6xl mx-auto space-y-12 pb-20 relative">

            {/* Celebration Particles */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-64 pointer-events-none overflow-hidden flex items-center justify-center">
                {confettiColors.map((color, i) => (
                    <motion.div
                        key={i}
                        className="absolute border-2 border-black"
                        initial={{ opacity: 0, scale: 0, y: 0, x: 0, rotate: 0 }}
                        animate={{
                            opacity: [0, 1, 0],
                            scale: [0, 1.5, 0],
                            y: [0, -200 - (i * 20)],
                            x: [(i - 2) * 80, (i - 2) * 120],
                            rotate: [0, 90, 180]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 3,
                            delay: i * 0.2
                        }}
                        style={{ width: 24, height: 24, backgroundColor: color }}
                    />
                ))}
            </div>

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row md:items-end justify-between gap-8 pt-8"
            >
                <div className="relative">
                    <div className="h-6 w-48 bg-[#fde047] border-4 border-black absolute -top-4 -left-2 -z-10 rotate-[-1deg]" />
                    <h2 className="text-6xl md:text-8xl font-black text-black tracking-tighter leading-none uppercase italic">
                        VERIFIED <span className="bg-black text-white px-4 py-1 inline-block rotate-[1deg]">PAYLOAD</span>
                    </h2>
                    <p className="text-2xl font-black text-black mt-4 uppercase italic">Impact assessment for <span className="bg-[#60a5fa] px-3 py-1 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">@{username}</span></p>
                </div>
                <button
                    onClick={onReset}
                    className="px-10 py-4 bg-white border-4 border-black text-black font-black text-xl uppercase italic shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] active:translate-y-[2px] active:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                >
                    New Analysis
                </button>
            </motion.div>

            {/* Payout & Growth Highlights */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                {/* Expected Payout Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="lg:col-span-2"
                >
                    <div className="relative group overflow-hidden rounded-3xl p-10 bg-[#fde047] border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-[-2px] group-hover:translate-y-[-2px] group-hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] transition-all">
                        <div className="absolute top-0 right-0 p-10 opacity-5 grayscale group-hover:opacity-10 transition-opacity">
                            <BarChart3 size={200} className="text-black" />
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="p-5 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-[-3deg]">
                                    <TrendingUp className="size-10 text-black" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-black uppercase tracking-widest italic">Est. Ad Revenue</h3>
                                    <p className="text-black font-bold text-sm bg-white/40 px-2 py-0.5 border-2 border-black w-fit mt-1">5M Verified Model</p>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row md:items-end gap-x-16 gap-y-10">
                                <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rotate-[1deg]">
                                    <p className="text-8xl font-black text-black tracking-tighter italic">
                                        {formatCurrency(expectedPayoutAvg)}
                                    </p>
                                    <p className="text-black mt-2 font-black text-xl uppercase italic">
                                        Range: <span className="bg-black text-white px-2 py-0.5">{formatCurrency(expectedPayoutMin)} - {formatCurrency(expectedPayoutMax)}</span>
                                    </p>
                                </div>
                                <div className="space-y-6 flex-1 max-w-xs">
                                    <div className="space-y-4">
                                        <div className="flex justify-between text-sm font-black uppercase tracking-tighter text-black">
                                            <span>Revenue Potential</span>
                                            <span className="bg-black text-white px-2 py-0.5">{data.confidenceScore} Conf.</span>
                                        </div>
                                        <div className="h-10 w-full bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden p-1">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: data.confidenceScore === 'High' ? '85%' : data.confidenceScore === 'Medium' ? '60%' : '35%' }}
                                                transition={{ duration: 1.5, delay: 0.5 }}
                                                className="h-full bg-black border-2 border-black"
                                            />
                                        </div>
                                    </div>
                                    <p className="text-xs text-black font-black uppercase italic leading-none">
                                        *Figures based on current ad share heuristics.
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
                    <div className="rounded-3xl p-10 bg-[#4ade80] border-4 border-black h-full flex flex-col justify-between shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                        <div>
                            <div className="p-5 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-fit mb-10 rotate-[5deg]">
                                <ShieldCheck className="size-10 text-black" />
                            </div>
                            <h3 className="text-lg font-black text-black uppercase tracking-widest mb-2 italic">Verified Boost</h3>
                            <p className="text-7xl font-black text-black tracking-tighter italic">
                                +{growthPercentage.toFixed(1)}%
                            </p>
                        </div>
                        <div className="mt-8 pt-8 border-t-4 border-black">
                            <p className="text-lg text-black font-black uppercase leading-tight italic">
                                <span className="bg-black text-white px-2 py-1 inline-block mb-1 rotate-[-2deg]">{(verifiedEngagementRate / engagementRate).toFixed(1)}x EFFECTIVE</span> <br />
                                with verified users!
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Main Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-6">

                {/* Verified Impressions Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="relative group"
                >
                    <div className="rounded-3xl p-10 bg-[#60a5fa] border-4 border-black h-full relative overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-white border-4 border-black rounded-full -mr-24 -mt-24 grayscale opacity-10" />

                        <div className="flex items-center gap-5 mb-10">
                            <div className="p-5 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-[-2deg]">
                                <Eye className="size-10 text-black font-black" />
                            </div>
                            <h3 className="text-3xl font-black text-black tracking-tighter uppercase italic">Verified Views</h3>
                        </div>

                        <div className="space-y-10">
                            <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rotate-[1deg]">
                                <p className="text-7xl font-black text-black tracking-tighter italic">
                                    {formatNumber(verifiedImpAvg)}
                                </p>
                                <p className="text-sm font-black text-black mt-2 uppercase italic bg-[#fde047] w-fit px-3 py-1 border-2 border-black">
                                    Range: {formatNumber(data.verifiedImpressions.min)} — {formatNumber(data.verifiedImpressions.max)}
                                </p>
                            </div>

                            <div className="space-y-5">
                                <div className="flex justify-between items-end">
                                    <span className="text-sm font-black text-black uppercase tracking-widest italic">Impression Density</span>
                                    <span className="text-2xl font-black text-white bg-black px-3 py-1 rotate-[-2deg]">{data.verifiedImpressionPercentage}%</span>
                                </div>
                                <div className="h-8 w-full bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden p-1">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${data.verifiedImpressionPercentage}%` }}
                                        transition={{ duration: 1.2, delay: 0.8 }}
                                        className="h-full bg-black"
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
                    className="relative group"
                >
                    <div className="rounded-3xl p-10 bg-[#f472b6] border-4 border-black h-full relative overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-white border-4 border-black rounded-full -mr-24 -mt-24 grayscale opacity-10" />

                        <div className="flex items-center gap-5 mb-10">
                            <div className="p-5 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-[3deg]">
                                <Heart className="size-10 text-black fill-black" />
                            </div>
                            <h3 className="text-3xl font-black text-black tracking-tighter uppercase italic">Verified Impact</h3>
                        </div>

                        <div className="space-y-10">
                            <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rotate-[-1deg]">
                                <p className="text-7xl font-black text-black tracking-tighter italic">
                                    {formatNumber(verifiedEngAvg)}
                                </p>
                                <p className="text-sm font-black text-black mt-2 uppercase italic bg-[#4ade80] w-fit px-3 py-1 border-2 border-black">
                                    Expected: {formatNumber(data.verifiedEngagements.min)} — {formatNumber(data.verifiedEngagements.max)}
                                </p>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <div className="px-6 py-3 bg-black text-white text-xs font-black uppercase tracking-widest rotate-[-1deg] border-2 border-black">
                                    High Quality Reach
                                </div>
                                <div className="px-6 py-3 bg-white text-black text-xs font-black uppercase tracking-widest border-2 border-black rotate-[2deg]">
                                    {data.timeRange}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Breakdown & Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                {/* Visual Data Breakdown */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <div className="p-10 h-full bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                        <h3 className="text-4xl font-black text-black mb-10 flex items-center gap-4 tracking-tighter uppercase italic">
                            <Zap className="size-8 fill-[#fde047]" />
                            Volume Distribution
                        </h3>

                        <div className="space-y-8">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="p-6 bg-[#f7f3eb] border-4 border-black rotate-[-1deg] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                    <p className="text-[10px] font-black text-black uppercase tracking-widest mb-2">Total Impressions</p>
                                    <p className="text-3xl font-black text-black italic">{formatNumber(totalImpressions)}</p>
                                    <div className="mt-4 h-4 w-full bg-white border-2 border-black p-0.5">
                                        <div className="h-full bg-[#60a5fa] w-full border-r-2 border-black" />
                                    </div>
                                </div>
                                <div className="p-6 bg-[#f7f3eb] border-4 border-black rotate-[1deg] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                    <p className="text-[10px] font-black text-black uppercase tracking-widest mb-2">Total Engagements</p>
                                    <p className="text-3xl font-black text-black italic">{formatNumber(totalEngagements)}</p>
                                    <div className="mt-4 h-4 w-full bg-white border-2 border-black p-0.5">
                                        <div className="h-full bg-[#f472b6] w-full border-r-2 border-black" />
                                    </div>
                                </div>
                                <div className="p-6 bg-[#f7f3eb]/40 border-2 border-dashed border-black">
                                    <p className="text-[10px] font-black text-black opacity-40 uppercase tracking-widest mb-2">Non-Verified Reach</p>
                                    <p className="text-2xl font-black text-black/40 italic">{formatNumber(nonVerifiedImpressions)}</p>
                                </div>
                                <div className="p-6 bg-[#f7f3eb]/40 border-2 border-dashed border-black">
                                    <p className="text-[10px] font-black text-black opacity-40 uppercase tracking-widest mb-2">Non-Verified Eng.</p>
                                    <p className="text-2xl font-black text-black/40 italic">{formatNumber(nonVerifiedEngagements)}</p>
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
                    <div className="p-10 h-full bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#fde047] opacity-20 rotate-45 -mb-32 -mr-32" />

                        <h3 className="text-4xl font-black text-black mb-10 flex items-center gap-4 tracking-tighter uppercase italic">
                            <Info className="size-8" />
                            Methodology
                        </h3>

                        <div className="space-y-8 text-black relative z-10 font-bold">
                            <p className="text-lg leading-tight uppercase italic">
                                We simulate <span className="bg-[#fde047] px-2">Verified Reach</span> via X's core heuristic: filtering impressions from accounts with active blue-check badges.
                            </p>

                            <ul className="space-y-4">
                                {[
                                    { label: 'Impression Weight', val: '4-9%', bg: 'bg-[#60a5fa]' },
                                    { label: 'Engagement Weight', val: '8-15%', bg: 'bg-[#f472b6]' },
                                    { label: 'V-RPM (Revenue)', val: '$1.70/1M', bg: 'bg-[#4ade80]' }
                                ].map((item, idx) => (
                                    <li key={idx} className={cn("flex items-center justify-between p-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]", item.bg, idx % 2 === 0 ? "rotate-[-1deg]" : "rotate-[1deg]")}>
                                        <span className="text-xs font-black uppercase tracking-widest">{item.label}</span>
                                        <span className="font-black text-2xl italic uppercase">{item.val}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="flex items-start gap-4 p-5 bg-black text-[#fde047] border-4 border-black mt-8 rotate-[-1deg]">
                                <AlertTriangle className="size-8 shrink-0 fill-[#fde047]" />
                                <p className="text-[10px] leading-tight font-black uppercase tracking-tight">
                                    Unofficial data projections based on creator correlations. Not affiliated with X Corp.
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
                className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-12 print:hidden"
            >
                <button
                    onClick={() => window.print()}
                    className="flex items-center gap-4 px-12 py-6 bg-black text-white font-black text-2xl uppercase italic border-4 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] active:translate-y-[2px] transition-all"
                >
                    <Download className="size-6" />
                    Export Report
                </button>
                <button
                    className="flex items-center gap-4 px-12 py-6 bg-[#fde047] text-black font-black text-2xl uppercase italic border-4 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] active:translate-y-[2px] transition-all"
                >
                    <Users className="size-6" />
                    Share Results
                </button>
            </motion.div>

        </div>
    );
}
