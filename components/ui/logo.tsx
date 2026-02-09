'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export function Logo({ className = "" }: { className?: string }) {
    return (
        <motion.div
            className={`flex items-center gap-2 ${className}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className="relative"
                animate={{
                    rotate: [0, 360],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur-md opacity-75" />
                <div className="relative bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-lg">
                    <Sparkles className="size-6 text-white" />
                </div>
            </motion.div>
            <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    X Verified
                </span>
                <span className="text-xs text-gray-400 -mt-1">Estimator</span>
            </div>
        </motion.div>
    );
}
