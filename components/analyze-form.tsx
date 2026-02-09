'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, X, Loader2, ArrowRight } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface AnalyzeFormProps {
    onAnalyze?: (data: { username: string; image: File }) => void;
}

export function AnalyzeForm({ onAnalyze }: AnalyzeFormProps) {
    const [username, setUsername] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [isDragOver, setIsDragOver] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Since we are only using the Analysis button for now
        // This is kept for safety
    };

    return (
        <div className="w-full max-w-md mx-auto p-8 rounded-3xl bg-white border border-slate-200 shadow-xl shadow-slate-200/50 transition-all duration-300">
            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Username Input */}
                <div className="space-y-2 text-left">
                    <label htmlFor="username" className="text-sm font-bold text-slate-500 ml-1 uppercase tracking-widest">
                        X Username
                    </label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">@</span>
                        <input
                            id="username"
                            type="text"
                            placeholder="elonmusk"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-10 pr-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all font-medium"
                            required
                        />
                    </div>
                </div>

                {/* Image Upload Area */}
                <div className="space-y-2 text-left">
                    <label className="text-sm font-bold text-slate-500 ml-1 uppercase tracking-widest">
                        Analytics Screenshot
                    </label>
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                        onDragLeave={() => setIsDragOver(false)}
                        onDrop={handleDrop}
                        className={cn(
                            "relative group border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 overflow-hidden",
                            isDragOver ? "border-blue-500 bg-blue-50" : "border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-slate-100/50",
                            preview ? "p-0 border-none h-64" : ""
                        )}
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileChange}
                        />

                        {preview ? (
                            <div className="relative h-full w-full">
                                <Image
                                    src={preview}
                                    alt="Preview"
                                    fill
                                    className="object-contain bg-slate-100 rounded-2xl"
                                />
                                <div className="absolute inset-0 bg-white/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                    <p className="text-slate-900 font-bold">Change Image</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setImage(null);
                                        setPreview(null);
                                        if (fileInputRef.current) fileInputRef.current.value = '';
                                    }}
                                    className="absolute top-3 right-3 p-2 rounded-full bg-slate-900/10 text-slate-900 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                >
                                    <X className="size-4" />
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-4 py-6">
                                <div className="p-4 rounded-2xl bg-white shadow-sm border border-slate-100 text-blue-600 group-hover:scale-110 transition-transform duration-300">
                                    <UploadCloud className="size-8" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-bold text-slate-900">
                                        Click or drag image
                                    </p>
                                    <p className="text-xs text-slate-500 font-medium">
                                        Upload your X analytics view
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Analysis Button (Renamed from Demo Mode) */}
                <button
                    type="button"
                    onClick={() => {
                        if (onAnalyze) {
                            setIsLoading(true);
                            // Brief delay for effect
                            setTimeout(() => {
                                onAnalyze({ username: username || 'demo', image: image || new File([], 'demo.png') });
                                setIsLoading(false);
                            }, 1500);
                        }
                    }}
                    disabled={isLoading}
                    className="w-full py-5 rounded-2xl bg-slate-900 text-white font-black hover:bg-slate-800 shadow-xl shadow-slate-900/10 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 tracking-tight text-lg"
                >
                    {isLoading ? (
                        <div className="flex items-center justify-center gap-3">
                            <Loader2 className="size-6 animate-spin" />
                            <span>Processing...</span>
                        </div>
                    ) : (
                        'Analysis'
                    )}
                </button>
            </form>
        </div>
    );
}
