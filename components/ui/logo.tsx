'use client';

import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

export function Logo({ className = "" }: { className?: string }) {
    return (
        <motion.div
            className={`flex items-center gap-3 ${className}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
        >
            <div className="bg-[#60a5fa] border-4 border-black p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-[-3deg]">
                <Zap className="size-6 text-black fill-white" />
            </div>
            <div className="flex flex-col">
                <span className="text-2xl font-black text-black leading-none tracking-tighter uppercase italic">
                    X-VERIFIED
                </span>
                <span className="text-[10px] font-black text-white bg-black w-fit px-1.5 py-0.5 rounded-sm uppercase tracking-widest mt-1">
                    Estimator
                </span>
            </div>
        </motion.div>
    );
}
