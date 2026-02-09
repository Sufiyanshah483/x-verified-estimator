'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { AnalyzeForm } from '@/components/analyze-form';
import { ResultsDashboard, AnalysisResult } from '@/components/results-dashboard';
import { FloatingShapes } from '@/components/ui/floating-shapes';
import { UploadCloud, Sparkles, Zap, ShieldCheck, BarChart3 } from 'lucide-react';
import { analyzeDemoScreenshot } from '@/actions/demo-analyze';

export default function Home() {
    const [view, setView] = useState<'hero' | 'analyzing' | 'results'>('hero');
    const [results, setResults] = useState<AnalysisResult | null>(null);
    const [username, setUsername] = useState<string>('');

    const handleStartAnalysis = () => {
        setView('analyzing');
    };

    const handleAnalyze = async (data: { username: string; image: File }) => {
        setUsername(data.username);
        // We'll use the demo action for now
        const result = await analyzeDemoScreenshot();
        setResults(result);
        setView('results');
    };

    const handleReset = () => {
        setView('hero');
        setResults(null);
        setUsername('');
    };

    return (
        <div className="flex min-h-screen flex-col relative overflow-hidden bg-[#f7f3eb] text-black selection:bg-[#fde047]">

            {/* Interactive Neubrutalist Shapes */}
            <FloatingShapes />

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
                            className="w-full max-w-4xl mx-auto text-center space-y-10 mb-20"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#fde047] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-xs font-black text-black uppercase tracking-widest animate-bounce">
                                <Sparkles className="size-4 fill-white" />
                                100% Accurate Estimations
                            </div>

                            <div className="relative inline-block">
                                <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-black leading-[0.9] uppercase italic">
                                    CREATE <br />
                                    <span className="bg-black text-white px-4 py-2 inline-block my-2 rotate-[-1deg]">
                                        YOUR VERIFIED
                                    </span> <br />
                                    IMPACT REPORT
                                </h1>
                                <div className="absolute -top-10 -right-20 hidden md:block w-32 h-32 bg-[#f472b6] border-4 border-black rounded-full shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center p-4">
                                    <span className="text-xs font-black leading-tight">MADE FOR CREATORS</span>
                                </div>
                            </div>

                            <p className="max-w-2xl mx-auto text-xl text-black font-bold bg-[#60a5fa]/20 border-2 border-black/20 p-4 rounded-xl rotate-[1deg]">
                                Unlock the secrets of your X analytics. We simulate verified reach with high-precision heuristic modeling.
                            </p>

                            <div className="p-12 mt-12 bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
                                <div className="flex flex-col items-center gap-6">
                                    <div className="p-5 rounded-2xl bg-[#4ade80] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                        <UploadCloud className="size-10 text-black" />
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-black mb-4 uppercase italic">Ready to Unlock?</h3>
                                        <p className="text-lg text-slate-600 mb-10 font-bold max-w-sm">
                                            Place your regular order... wait, I mean upload your screenshot!
                                        </p>

                                        <button
                                            onClick={handleStartAnalysis}
                                            className="px-12 py-5 rounded-lg bg-[#fde047] text-black font-black text-2xl uppercase italic border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-y-[-2px] active:translate-y-[2px] active:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                                        >
                                            Start Analysis
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Features Section - Styled like the requested image but in Neubrutalism */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 text-left">
                                <div className="p-8 bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rotate-[-1deg] hover:rotate-0 transition-all">
                                    <div className="w-12 h-12 bg-[#fde047] border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center mb-6">
                                        <Zap className="size-6 text-black fill-white" />
                                    </div>
                                    <h4 className="text-xl font-black uppercase italic mb-2 tracking-tighter">Instant Vision API</h4>
                                    <p className="text-sm font-bold text-slate-600 leading-snug">Our AI reads your screenshot data in seconds with high accuracy.</p>
                                </div>

                                <div className="p-8 bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rotate-[1deg] hover:rotate-0 transition-all">
                                    <div className="w-12 h-12 bg-[#4ade80] border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center mb-6">
                                        <ShieldCheck className="size-6 text-black fill-white" />
                                    </div>
                                    <h4 className="text-xl font-black uppercase italic mb-2 tracking-tighter">Verified Estimation</h4>
                                    <p className="text-sm font-bold text-slate-600 leading-snug">Heuristic models compliant with public engagement patterns.</p>
                                </div>

                                <div className="p-8 bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rotate-[-1deg] hover:rotate-0 transition-all">
                                    <div className="w-12 h-12 bg-[#c084fc] border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center mb-6">
                                        <BarChart3 className="size-6 text-black fill-white" />
                                    </div>
                                    <h4 className="text-xl font-black uppercase italic mb-2 tracking-tighter">Impact Breakdown</h4>
                                    <p className="text-sm font-bold text-slate-600 leading-snug">See estimated ranges for likes, replies, and reposts.</p>
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
                            <div className="text-center mb-10">
                                <h2 className="text-5xl font-black text-black mb-4 uppercase italic">Upload Details</h2>
                                <p className="text-slate-600 font-bold bg-[#fde047] w-fit mx-auto px-4 py-1 border-2 border-black rotate-[-2deg]">
                                    We need your stats, Pablo.
                                </p>
                            </div>
                            <AnalyzeForm onAnalyze={handleAnalyze} />
                            <button
                                onClick={() => setView('hero')}
                                className="mt-12 text-sm font-black text-black border-b-2 border-black uppercase tracking-widest hover:bg-black hover:text-white transition-all px-2"
                            >
                                ← Back to Home
                            </button>
                        </motion.div>
                    )}

                    {view === 'results' && results && (
                        <motion.div
                            key="results"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="w-full"
                        >
                            <ResultsDashboard data={results} username={username} onReset={handleReset} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            <Footer />
        </div>
    );
}
