'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { slideInLeft, slideInRight, fadeInUp, staggerContainer } from '@/lib/animations';
import { useState, useEffect } from 'react';

function CountUpStat({ value, label }: { value: string; label: string }) {
    const [count, setCount] = useState(0);
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });

    const numericStr = value.replace(/\D/g, '');
    const suffix = value.replace(/\d/g, '');
    const target = parseInt(numericStr) || 0;

    useEffect(() => {
        if (inView && target > 0) {
            let current = 0;
            const increment = target / 40;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    setCount(target);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(current));
                }
            }, 28);
            return () => clearInterval(timer);
        }
    }, [inView, target]);

    return (
        <div ref={ref} className="text-center">
            <div
                className="text-4xl md:text-5xl font-bold mb-1"
                style={{ color: '#ff6b6b', fontFamily: "'DM Serif Display', serif" }}
            >
                {target > 0 ? count : numericStr}{suffix}
            </div>
            <div className="text-sm" style={{ color: '#a0a0a0', fontFamily: "'DM Sans', sans-serif" }}>
                {label}
            </div>
        </div>
    );
}

export default function About({ data }: any) {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

    return (
        <section
            id="about"
            ref={ref}
            className="relative py-24 md:py-36 px-6 overflow-hidden"
            style={{ backgroundColor: '#0f0f0f' }}
        >
            {/* Background glow */}
            <div
                className="absolute top-0 right-0 pointer-events-none"
                style={{
                    width: '400px',
                    height: '400px',
                    background: 'radial-gradient(circle, rgba(255,107,107,0.08) 0%, transparent 70%)',
                }}
            />

            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-24">
                    {/* Left Column – Decorative */}
                    <motion.div
                        initial="hidden"
                        animate={inView ? 'visible' : 'hidden'}
                        variants={slideInLeft}
                        className="lg:col-span-2 relative"
                    >
                        {/* Giant outline number */}
                        <div
                            className="select-none leading-none"
                            style={{
                                fontSize: 'clamp(120px, 18vw, 220px)',
                                fontFamily: "'DM Serif Display', serif",
                                color: 'transparent',
                                WebkitTextStroke: '1px rgba(255,255,255,0.06)',
                                lineHeight: 1,
                            }}
                        >
                            01
                        </div>

                        {/* Label & heading */}
                        <div className="-mt-8 relative z-10">
                            <span
                                className="text-xs uppercase tracking-widest font-semibold"
                                style={{ color: '#ff6b6b', fontFamily: "'DM Sans', sans-serif" }}
                            >
                                About Me
                            </span>
                            <h2
                                className="text-4xl md:text-5xl font-bold text-white mt-3 leading-tight"
                                style={{ fontFamily: "'DM Serif Display', serif" }}
                            >
                                Crafting experiences<br />
                                <span style={{ color: '#ff6b6b' }}>that matter</span>
                            </h2>
                        </div>
                    </motion.div>

                    {/* Right Column – Content */}
                    <motion.div
                        initial="hidden"
                        animate={inView ? 'visible' : 'hidden'}
                        variants={slideInRight}
                        className="lg:col-span-3"
                    >
                        {/* Bio with left accent border */}
                        <div
                            className="pl-6 mb-10"
                            style={{ borderLeft: '3px solid #ff6b6b' }}
                        >
                            <p
                                className="text-base md:text-lg leading-relaxed"
                                style={{ color: '#c0c0c0', fontFamily: "'DM Sans', sans-serif" }}
                            >
                                {data.bio}
                            </p>
                        </div>

                        {/* Philosophy cards */}
                        {data.philosophy && data.philosophy.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                                {data.philosophy.map((item: string, i: number) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={inView ? { opacity: 1, y: 0 } : {}}
                                        transition={{ delay: 0.2 + i * 0.1 }}
                                        className="p-5 rounded-xl transition-all duration-200"
                                        style={{
                                            backgroundColor: 'rgba(255,255,255,0.03)',
                                            border: '1px solid rgba(255,255,255,0.07)',
                                        }}
                                        onMouseEnter={(e) => {
                                            (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.06)';
                                        }}
                                        onMouseLeave={(e) => {
                                            (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.03)';
                                        }}
                                    >
                                        <div className="text-xl mb-2">💡</div>
                                        <p
                                            className="text-sm leading-relaxed"
                                            style={{ color: '#a0a0a0', fontFamily: "'DM Sans', sans-serif" }}
                                        >
                                            {item}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        {/* Stats */}
                        {data.stats && data.stats.length > 0 && (
                            <motion.div
                                variants={staggerContainer}
                                initial="hidden"
                                animate={inView ? 'visible' : 'hidden'}
                                className="grid grid-cols-3 gap-6 pt-8"
                                style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
                            >
                                {data.stats.map((stat: any, i: number) => (
                                    <motion.div key={i} variants={fadeInUp}>
                                        <CountUpStat value={stat.value} label={stat.label} />
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
