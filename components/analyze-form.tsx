'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, X, Loader2, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface AnalyzeFormProps {
    onAnalyze?: (data: { username: string; image: File }) => Promise<void>;
}

export function AnalyzeForm({ onAnalyze }: AnalyzeFormProps) {
    const [username, setUsername] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [isDragOver, setIsDragOver] = useState(false);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            handleFile(file);
        }
    };

    const handleFile = (file: File) => {
        if (file.type.startsWith('image/')) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleTriggerAnalysis = async () => {
        if (!onAnalyze || loading) return;

        setLoading(true);
        try {
            await onAnalyze({
                username: username || 'pablo',
                image: image || new File([], 'demo.png')
            });
        } catch (error) {
            console.error("Analysis submission error:", error);
            setLoading(false); // Reset on error
        }
        // No setLoading(false) here because if it succeeds, the component unmounts
    };

    return (
        <div className="w-full max-w-md mx-auto p-8 bg-white border-4 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all">
            <div className="space-y-8">

                {/* Username Input */}
                <div className="space-y-2 text-left">
                    <label htmlFor="username" className="text-sm font-black text-black uppercase tracking-widest pl-1">
                        Creator Handle
                    </label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-black font-black text-xl">@</span>
                        <input
                            id="username"
                            type="text"
                            placeholder="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-[#f7f3eb] border-4 border-black rounded-lg py-4 pl-12 pr-4 text-black placeholder:text-slate-400 focus:outline-none focus:bg-[#fde047] transition-all font-bold text-lg"
                            disabled={loading}
                        />
                    </div>
                </div>

                {/* Image Upload Area */}
                <div className="space-y-2 text-left">
                    <label className="text-sm font-black text-black uppercase tracking-widest pl-1">
                        Analytics Visual
                    </label>
                    <div
                        onClick={() => !loading && fileInputRef.current?.click()}
                        onDragOver={(e) => { e.preventDefault(); !loading && setIsDragOver(true); }}
                        onDragLeave={() => setIsDragOver(false)}
                        onDrop={handleDrop}
                        className={cn(
                            "relative group border-4 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 overflow-hidden",
                            isDragOver ? "border-black bg-[#60a5fa]/20" : "border-black bg-[#f7f3eb] hover:bg-[#60a5fa]/10",
                            preview ? "p-0 border-solid h-64" : "",
                            loading ? "cursor-not-allowed opacity-80" : ""
                        )}
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileChange}
                            disabled={loading}
                        />

                        {preview ? (
                            <div className="relative h-full w-full">
                                <Image
                                    src={preview}
                                    alt="Preview"
                                    fill
                                    className="object-contain bg-white rounded-lg p-2"
                                />
                                {!loading && (
                                    <>
                                        <div className="absolute inset-0 bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <p className="text-black font-black uppercase text-xl bg-[#fde047] px-4 py-2 border-2 border-black">Change</p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setImage(null);
                                                setPreview(null);
                                                if (fileInputRef.current) fileInputRef.current.value = '';
                                            }}
                                            className="absolute top-2 right-2 p-2 rounded-lg bg-black text-white hover:bg-red-500 transition-all border-2 border-black"
                                        >
                                            <X className="size-4" />
                                        </button>
                                    </>
                                )}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-4 py-6">
                                <div className="p-4 rounded-xl bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-black group-hover:bg-[#fde047] transition-all duration-300">
                                    <UploadCloud className="size-10" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-lg font-black text-black uppercase italic">
                                        Unlock Upload
                                    </p>
                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-tight">
                                        Drop your X analytics view
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Analysis Button */}
                <button
                    type="button"
                    onClick={handleTriggerAnalysis}
                    disabled={loading}
                    className="w-full py-5 rounded-lg bg-[#4ade80] text-black font-black text-2xl uppercase italic border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-y-[-2px] active:translate-y-[2px] active:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50"
                >
                    {loading ? (
                        <div className="flex items-center justify-center gap-3">
                            <Loader2 className="size-8 animate-spin" />
                            <span>Unlocking...</span>
                        </div>
                    ) : (
                        'Unlock Analysis'
                    )}
                </button>
            </div>
        </div>
    );
}
