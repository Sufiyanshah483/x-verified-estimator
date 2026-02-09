'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export function FloatingShapes() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    const shapes = [
        { size: 120, x: '15%', y: '25%', color: '#fde047', rotate: 12, parallax: 0.1 },
        { size: 180, x: '75%', y: '15%', color: '#60a5fa', rotate: -8, parallax: -0.15 },
        { size: 150, x: '85%', y: '75%', color: '#4ade80', rotate: 15, parallax: 0.08 },
        { size: 100, x: '25%', y: '85%', color: '#f472b6', rotate: -15, parallax: -0.12 },
        { size: 140, x: '50%', y: '45%', color: '#c084fc', rotate: 5, parallax: 0.05 },
    ];

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {shapes.map((shape, i) => {
                // Smooth spring physics for movement
                const springConfig = { damping: 25, stiffness: 100 };
                const x = useSpring(useTransform(mouseX, (val: number) => val * shape.parallax), springConfig);
                const y = useSpring(useTransform(mouseY, (val: number) => val * shape.parallax), springConfig);

                return (
                    <motion.div
                        key={i}
                        className="absolute border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                        style={{
                            width: shape.size,
                            height: shape.size,
                            left: shape.x,
                            top: shape.y,
                            backgroundColor: shape.color,
                            rotate: shape.rotate,
                            x,
                            y,
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                    />
                );
            })}

            {/* Some smaller floating circles for detail */}
            {[...Array(6)].map((_, i) => {
                const parallax = (i + 1) * 0.02 * (i % 2 === 0 ? 1 : -1);
                const x = useSpring(useTransform(mouseX, (val: number) => val * parallax), { damping: 40 });
                const y = useSpring(useTransform(mouseY, (val: number) => val * parallax), { damping: 40 });

                return (
                    <motion.div
                        key={`circle-${i}`}
                        className="absolute border-4 border-black rounded-full"
                        style={{
                            width: 30 + i * 10,
                            height: 30 + i * 10,
                            left: `${(i + 1) * 15}%`,
                            top: `${(i + 1) * 13}%`,
                            backgroundColor: i % 2 === 0 ? '#fde047' : '#ffffff',
                            x,
                            y,
                        }}
                    />
                );
            })}
        </div>
    );
}
