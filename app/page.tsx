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

                            {/* The Creator Menu - New Section */}
                            <div className="mt-32 w-full max-w-5xl mx-auto space-y-12">
                                <div className="text-center relative">
                                    <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter">
                                        THE CREATOR <span className="bg-[#fde047] px-4 py-1 border-4 border-black inline-block rotate-2 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">MENU</span>
                                    </h2>
                                    <p className="mt-6 text-xl font-bold uppercase italic text-slate-500">What's inside your analysis package?</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-10">
                                    <div className="bg-white border-4 border-black p-8 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] space-y-4 rotate-[-1deg]">
                                        <div className="flex justify-between items-center border-b-4 border-black pb-2">
                                            <h5 className="text-2xl font-black uppercase italic">01. THE VISION CRUNCH</h5>
                                            <span className="bg-black text-white px-2 py-1 font-black text-sm">PRO</span>
                                        </div>
                                        <p className="font-bold text-slate-600 leading-tight">Our AI Vision API deep-scans your screenshots for hidden engagement patterns, verifying every pixel of your reach.</p>
                                    </div>

                                    <div className="bg-[#60a5fa] border-4 border-black p-8 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] space-y-4 rotate-[1.5deg]">
                                        <div className="flex justify-between items-center border-b-4 border-black pb-2">
                                            <h5 className="text-2xl font-black uppercase italic text-black">02. HEURISTIC JUICE</h5>
                                            <span className="bg-white text-black px-2 py-1 font-black text-sm border-2 border-black">FREE</span>
                                        </div>
                                        <p className="font-black text-black leading-tight">Complex math models that filter out the noise and show you the pure, verified impressions that actually count.</p>
                                    </div>

                                    <div className="bg-[#f472b6] border-4 border-black p-8 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] space-y-4 rotate-[-0.5deg]">
                                        <div className="flex justify-between items-center border-b-4 border-black pb-2">
                                            <h5 className="text-2xl font-black uppercase italic text-black">03. PAYOUT TOPPING</h5>
                                            <span className="bg-black text-white px-2 py-1 font-black text-sm">PREMIUM</span>
                                        </div>
                                        <p className="font-black text-black leading-tight">Get an accurate revenue projection based on current X-Ad-Share rates. See what your content is really worth.</p>
                                    </div>

                                    <div className="bg-white border-4 border-black p-8 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] space-y-4 rotate-[1deg]">
                                        <div className="flex justify-between items-center border-b-4 border-black pb-2">
                                            <h5 className="text-2xl font-black uppercase italic">04. GROWTH DRESSING</h5>
                                            <span className="bg-[#4ade80] text-black px-2 py-1 font-black text-sm border-2 border-black">CORE</span>
                                        </div>
                                        <p className="font-bold text-slate-600 leading-tight">Actionable insights on how to boost your verified engagement by up to 40% using targeted formatting.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Newsletter / Join Section */}
                            <div className="mt-40 w-full max-w-4xl mx-auto p-12 bg-black text-white border-4 border-black shadow-[15px_15px_0px_0px_rgba(15,23,42,0.1)] relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-[#fde047] rotate-45 translate-x-32 -translate-y-32" />
                                <div className="relative z-10 space-y-8">
                                    <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none">
                                        JOIN THE <br /> <span className="text-[#fde047]">CREATOR CLUB</span>
                                    </h2>
                                    <p className="text-xl font-bold uppercase italic text-slate-400 max-w-md">
                                        Get weekly tips on how to master the X algorithm and maximize your payouts.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <input
                                            type="email"
                                            placeholder="Pablo@sandwich.com"
                                            className="flex-1 bg-white border-4 border-[#fde047] px-6 py-4 text-black font-black placeholder:text-slate-300 focus:outline-none"
                                        />
                                        <button className="px-10 py-4 bg-[#fde047] text-black font-black uppercase italic text-xl border-4 border-white shadow-[6px_6px_0px_0px_rgba(255,255,255,0.2)] hover:bg-white transition-all">
                                            SUBSCRIBE
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
