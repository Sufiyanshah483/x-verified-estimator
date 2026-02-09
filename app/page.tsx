'use client';

import React, { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { GlassCard } from '@/components/ui/glass-card';
import { AnalyzeForm } from '@/components/analyze-form';
import { ResultsDashboard, AnalysisResult } from '@/components/results-dashboard';
import { Zap, ShieldCheck, BarChart3, UploadCloud } from 'lucide-react';

export default function Home() {
    const [view, setView] = useState<'hero' | 'analyzing' | 'results'>('hero');
    const [username, setUsername] = useState('');
    const [results, setResults] = useState<AnalysisResult | null>(null);

    const handleStartAnalysis = () => {
        setView('analyzing');
        // document.getElementById('analyze-section')?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleAnalyze = async ({ username: user, image }: { username: string; image: File }) => {
        setUsername(user);

        try {
            const formData = new FormData();
            formData.append('username', user);
            formData.append('image', image);

            // Dynamically import to ensure server action is handled correctly
            const { analyzeScreenshot } = await import('@/actions/analyze');
            const data = await analyzeScreenshot(formData);

            if (data.error) {
                alert(data.error);
                return;
            }

            setResults(data as AnalysisResult);
            setView('results');
        } catch (error) {
            console.error("Failed to analyze:", error);
            alert("An unexpected error occurred. Please try again.");
        }
    };

    const handleReset = () => {
        setResults(null);
        setUsername('');
        setView('hero');
    };

    return (
        <div className="flex min-h-screen flex-col relative overflow-hidden bg-black text-white selection:bg-purple-500/30">

            {/* Background Gradients */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-purple-900/30 blur-[120px]" />
                <div className="absolute top-[20%] right-[-10%] h-[600px] w-[600px] rounded-full bg-blue-900/20 blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[20%] h-[500px] w-[500px] rounded-full bg-indigo-900/20 blur-[120px]" />
            </div>

            <Header />

            <main className="relative z-10 flex-1 flex flex-col items-center pt-32 pb-16 px-4 md:px-6">

                {view === 'hero' && (
                    /* Hero Section */
                    <section className="w-full max-w-4xl mx-auto text-center space-y-8 mb-20 animate-in fade-in zoom-in duration-500">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-purple-200 mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                            </span>
                            AI-Powered Analysis
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-white/50 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">
                            Estimate Your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                                Verified Impact
                            </span>
                        </h1>

                        <p className="max-w-2xl mx-auto text-lg text-gray-400 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
                            X (Twitter) doesn't show verified impressions. We use AI vision and advanced heuristics to approximate your true reach among verified users.
                        </p>

                        <GlassCard className="p-8 mt-12 backdrop-blur-xl border-white/10 bg-black/40 hover:bg-black/50 transition-colors">
                            <div className="flex flex-col items-center gap-6">
                                <div className="p-4 rounded-full bg-white/5 border border-white/10">
                                    <UploadCloud className="size-8 text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">Ready to analyze?</h3>
                                    <p className="text-sm text-gray-400 mb-6">
                                        Upload a screenshot of your X analytics to get started.
                                    </p>

                                    <button
                                        onClick={handleStartAnalysis}
                                        className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 font-semibold text-white shadow-lg hover:shadow-blue-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        Start Analysis
                                    </button>
                                </div>
                            </div>
                        </GlassCard>
                    </section>
                )}

                {view === 'analyzing' && (
                    <div className="w-full max-w-md mx-auto py-12 animate-in fade-in slide-in-from-bottom-8 duration-500">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold mb-2">Upload Analytics</h2>
                            <p className="text-gray-400">Please upload a clear screenshot of your X analytics dashboard.</p>
                        </div>
                        <AnalyzeForm onAnalyze={handleAnalyze} />
                        <button onClick={() => setView('hero')} className="mt-8 text-sm text-gray-500 hover:text-white transition-colors">
                            Back to Home
                        </button>
                    </div>
                )}

                {view === 'results' && results && (
                    <ResultsDashboard
                        data={results}
                        username={username}
                        onReset={handleReset}
                    />
                )}

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
