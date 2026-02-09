'use client';

import { motion } from 'framer-motion';

export function FloatingShapes() {
    const shapes = [
        { size: 300, x: '10%', y: '20%', duration: 20, delay: 0, color: 'from-blue-200/30 to-purple-200/30' },
        { size: 200, x: '80%', y: '60%', duration: 25, delay: 2, color: 'from-purple-200/30 to-pink-200/30' },
        { size: 250, x: '60%', y: '10%', duration: 30, delay: 4, color: 'from-cyan-200/30 to-blue-200/30' },
        { size: 180, x: '20%', y: '70%', duration: 22, delay: 1, color: 'from-pink-200/30 to-purple-200/30' },
        { size: 220, x: '90%', y: '30%', duration: 28, delay: 3, color: 'from-blue-200/30 to-cyan-200/30' },
    ];

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {shapes.map((shape, i) => (
                <motion.div
                    key={i}
                    className={`absolute rounded-full bg-gradient-to-br ${shape.color} blur-3xl`}
                    style={{
                        width: shape.size,
                        height: shape.size,
                        left: shape.x,
                        top: shape.y,
                    }}
                    animate={{
                        x: [0, 50, -50, 0],
                        y: [0, -50, 50, 0],
                        scale: [1, 1.1, 0.9, 1],
                    }}
                    transition={{
                        duration: shape.duration,
                        repeat: Infinity,
                        delay: shape.delay,
                        ease: "easeInOut"
                    }}
                />
            ))}
        </div>
    );
}
