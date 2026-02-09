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
        if (!username || !image) return;

        setIsLoading(true);
        // Simulate API call for now or call prop
        setTimeout(() => {
            if (onAnalyze) onAnalyze({ username, image });
            setIsLoading(false);
        }, 2000);
    };

    return (
        <GlassCard className="w-full max-w-md mx-auto p-6 transition-all duration-300">
            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Username Input */}
                <div className="space-y-2 text-left">
                    <label htmlFor="username" className="text-sm font-medium text-gray-300 ml-1">
                        X Username
                    </label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">@</span>
                        <input
                            id="username"
                            type="text"
                            placeholder="elonmusk"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-8 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                            required
                        />
                    </div>
                </div>

                {/* Image Upload Area */}
                <div className="space-y-2 text-left">
                    <label className="text-sm font-medium text-gray-300 ml-1">
                        Analytics Screenshot
                    </label>
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                        onDragLeave={() => setIsDragOver(false)}
                        onDrop={handleDrop}
                        className={cn(
                            "relative group border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 overflow-hidden",
                            isDragOver ? "border-blue-500 bg-blue-500/10" : "border-white/10 hover:border-white/20 hover:bg-white/5",
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
                                    className="object-cover rounded-xl"
                                />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <p className="text-white font-medium">Change Image</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setImage(null);
                                        setPreview(null);
                                        if (fileInputRef.current) fileInputRef.current.value = '';
                                    }}
                                    className="absolute top-2 right-2 p-1 rounded-full bg-black/50 text-white hover:bg-red-500/80 transition-colors"
                                >
                                    <X className="size-4" />
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-3 py-4">
                                <div className="p-3 rounded-full bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform duration-300">
                                    <UploadCloud className="size-6" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-200">
                                        Click or drag image
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Upload your X analytics view
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={!username || !image || isLoading}
                    className={cn(
                        "w-full py-3 rounded-xl font-semibold text-white shadow-lg transition-all flex items-center justify-center gap-2",
                        (!username || !image)
                            ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                            : "bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-blue-500/25 hover:scale-[1.02] active:scale-[0.98]"
                    )}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="size-4 animate-spin" />
                            Analyzing...
                        </>
                    ) : (
                        <>
                            Calculate Estimate
                            <ArrowRight className="size-4" />
                        </>
                    )}
                </button>
            </form>
        </GlassCard>
    );
}
