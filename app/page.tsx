'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { GlassCard } from '@/components/ui/glass-card';
import { FloatingShapes } from '@/components/ui/floating-shapes';
import { CursorGlow } from '@/components/ui/cursor-glow';
import { AnalyzeForm } from '@/components/analyze-form';
import { ResultsDashboard, AnalysisResult } from '@/components/results-dashboard';
import { Zap, ShieldCheck, BarChart3, UploadCloud } from 'lucide-react';

export default function Home() {
    const [view, setView] = useState<'hero' | 'analyzing' | 'results'>('hero');
    const [username, setUsername] = useState('');
    const [results, setResults] = useState<AnalysisResult | null>(null);

    const handleStartAnalysis = () => {
        setView('analyzing');
    };

    const handleAnalyze = async ({ username: user, image }: { username: string; image: File }) => {
        setUsername(user);

        try {
            // Check if this is demo mode - Client-side demo for maximum reliability
            if (user === 'demo_user' || user === 'demo') {
                // Return demo results immediately
                const demoData = {
                    verifiedImpressions: { min: 45000, max: 108000 },
                    verifiedEngagements: { min: 3600, max: 6750 },
                    verifiedImpressionPercentage: 6.5,
                    confidenceScore: 'High',
                    timeRange: 'Last 28 days',
                    raw: {
                        impressions: 1200000,
                        engagements: 45000
                    }
                };

                // Add a small delay for realistic "AI processing" feel
                await new Promise(r => setTimeout(r, 1500));

                setResults(demoData as AnalysisResult);
                setView('results');
                return;
            }

            const formData = new FormData();
            formData.append('username', user);
            formData.append('image', image);

            // Dynamically import to ensure server action is handled correctly
            const { analyzeScreenshot } = await import('@/actions/analyze');
            const data = await analyzeScreenshot(formData);

            // Always set results, even if there's an error (will be displayed in dashboard)
            setResults(data as AnalysisResult);
            setView('results');
        } catch (error) {
            console.error("Failed to analyze:", error);
            // Create error result object
            setResults({
                verifiedImpressions: { min: 0, max: 0 },
                verifiedEngagements: { min: 0, max: 0 },
                verifiedImpressionPercentage: 0,
                confidenceScore: 'Low',
                timeRange: 'N/A',
                error: "An unexpected error occurred. Please try again."
            } as AnalysisResult);
            setView('results');
        }
    };

    const handleReset = () => {
        setResults(null);
        setUsername('');
        setView('hero');
    };

    return (
        <div className="flex min-h-screen flex-col relative overflow-hidden bg-slate-50 text-slate-900 selection:bg-blue-500/20">

            {/* Floating 3D Shapes Background */}
            <FloatingShapes />

            {/* Cursor Following Glow Effect */}
            <CursorGlow />

            <Header />

            <main className="relative z-10 flex-1 flex flex-col items-center pt-32 pb-16 px-4 md:px-6">

                <AnimatePresence mode="wait">
                    {view === 'hero' && (
                        <motion.section
                            key="hero"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="w-full max-w-4xl mx-auto text-center space-y-8 mb-20"
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold text-blue-700 mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700 uppercase tracking-widest">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                                </span>
                                AI-Powered Analysis
                            </div>

                            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100 leading-[1.1]">
                                Estimate Your <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                                    Verified Impact
                                </span>
                            </h1>

                            <p className="max-w-2xl mx-auto text-lg text-slate-500 font-medium animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
                                X (Twitter) doesn't show verified impressions. We use AI vision and advanced heuristics to approximate your true reach among verified users.
                            </p>

                            <div className="p-10 mt-12 rounded-3xl border border-slate-200 bg-white/50 backdrop-blur-xl shadow-xl shadow-slate-200/50 hover:bg-white/80 transition-all duration-500">
                                <div className="flex flex-col items-center gap-6">
                                    <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100">
                                        <UploadCloud className="size-8 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black mb-2 text-slate-900">Ready to analyze?</h3>
                                        <p className="text-base text-slate-500 mb-8 font-medium">
                                            Upload a screenshot of your X analytics to get started.
                                        </p>

                                        <button
                                            onClick={handleStartAnalysis}
                                            className="px-10 py-4 rounded-2xl bg-slate-900 text-white font-bold shadow-xl shadow-slate-900/20 transition-all hover:scale-[1.05] active:scale-[0.95] hover:bg-slate-800"
                                        >
                                            Start Analysis
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.section>
                    )}

                    {view === 'analyzing' && (
                        <motion.div
                            key="analyzing"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.4 }}
                            className="w-full max-w-md mx-auto py-12"
                        >
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-black text-slate-900 mb-2">Upload Analytics</h2>
                                <p className="text-slate-500 font-medium">Please upload a clear screenshot of your X analytics dashboard.</p>
                            </div>
                            <AnalyzeForm onAnalyze={handleAnalyze} />
                            <button onClick={() => setView('hero')} className="mt-8 text-sm text-gray-500 hover:text-white transition-colors">
                                Back to Home
                            </button>
                        </motion.div>
                    )}

                    {view === 'results' && results && (
                        <motion.div
                            key="results"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 30 }}
                            transition={{ duration: 0.5 }}
                        >
                            <ResultsDashboard
                                data={results}
                                username={username}
                                onReset={handleReset}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Feature Grid - Only show on Hero */}
                {view === 'hero' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
                        <FeatureCard
                            icon={<Zap className="size-6 text-yellow-400" />}
                            title="Instant Vision API"
                            description="Our AI reads your screenshot data in seconds with high accuracy."
                        />
                        <FeatureCard
                            icon={<ShieldCheck className="size-6 text-green-400" />}
                            title="Verified Estimation"
                            description="Heuristic models compliant with public engagement patterns."
                        />
                        <FeatureCard
                            icon={<BarChart3 className="size-6 text-purple-400" />}
                            title="Engagement Breakdown"
                            description="See estimated ranges for likes, replies, and reposts."
                        />
                    </div>
                )}

            </main>

            <Footer />
        </div>
    );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <GlassCard className="p-6 hover:bg-white/10 transition-colors duration-300">
            <div className="size-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 border border-white/10">
                {icon}
            </div>
            <h3 className="text-lg font-semibold mb-2 text-white">{title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
                {description}
            </p>
        </GlassCard>
    );
}
