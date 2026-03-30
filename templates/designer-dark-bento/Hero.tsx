'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { fadeInUp, staggerContainer, charReveal } from '@/lib/animations';
import { IconArrowRight, IconDownload } from '@tabler/icons-react';

export default function Hero({ data }: any) {
    const firstName = data.personalInfo.name.split(' ')[0];
    const lastName = data.personalInfo.name.split(' ').slice(1).join(' ');

    return (
        <section
            className="relative min-h-screen flex items-center justify-center px-6 pt-28 pb-20 overflow-hidden"
            style={{ backgroundColor: '#0f0f0f' }}
        >
            {/* Decorative Background Blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                        opacity: [0.25, 0.45, 0.25],
                    }}
                    transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                    className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(255,107,107,0.3) 0%, transparent 70%)',
                        filter: 'blur(60px)',
                    }}
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        rotate: [90, 0, 90],
                        opacity: [0.4, 0.2, 0.4],
                    }}
                    transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                    className="absolute -bottom-40 -right-40 w-[700px] h-[700px] rounded-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(255,176,136,0.25) 0%, transparent 70%)',
                        filter: 'blur(80px)',
                    }}
                />
                {/* Subtle grid lines */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
                        backgroundSize: '60px 60px',
                    }}
                />
            </div>

            {/* Content */}
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="relative z-10 text-center max-w-5xl mx-auto"
            >
                {/* Availability Badge */}
                <motion.div variants={fadeInUp} className="mb-10 inline-flex">
                    <div
                        className="flex items-center gap-2.5 px-5 py-2.5 rounded-full"
                        style={{
                            backgroundColor: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            backdropFilter: 'blur(10px)',
                        }}
                    >
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-sm text-gray-300" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                            Available for projects
                        </span>
                    </div>
                </motion.div>

                {/* Name with character reveal */}
                <div className="mb-6">
                    <motion.h1
                        variants={staggerContainer}
                        className="leading-none"
                        style={{ fontFamily: "'DM Serif Display', serif" }}
                    >
                        {/* First name */}
                        <div className="block">
                            {firstName.split('').map((char: string, i: number) => (
                                <motion.span
                                    key={`f-${i}`}
                                    variants={charReveal}
                                    className="inline-block text-white"
                                    style={{ fontSize: 'clamp(60px, 10vw, 120px)' }}
                                >
                                    {char}
                                </motion.span>
                            ))}
                        </div>
                        {/* Last name - with accent color */}
                        {lastName && (
                            <div className="block -mt-2">
                                {lastName.split('').map((char: string, i: number) => (
                                    <motion.span
                                        key={`l-${i}`}
                                        variants={charReveal}
                                        className="inline-block"
                                        style={{ fontSize: 'clamp(60px, 10vw, 120px)', color: '#ff6b6b' }}
                                    >
                                        {char}
                                    </motion.span>
                                ))}
                            </div>
                        )}
                    </motion.h1>
                </div>

                {/* Role */}
                <motion.p
                    variants={fadeInUp}
                    className="text-xl md:text-2xl mb-4 font-semibold tracking-wide"
                    style={{ color: '#a0a0a0', fontFamily: "'DM Sans', sans-serif" }}
                >
                    {data.personalInfo.role}
                </motion.p>

                {/* Tagline */}
                <motion.p
                    variants={fadeInUp}
                    className="text-base md:text-lg mb-12 max-w-2xl mx-auto leading-relaxed"
                    style={{ color: '#6b6b6b', fontFamily: "'DM Sans', sans-serif" }}
                >
                    {data.tagline}
                </motion.p>

                {/* CTAs */}
                <motion.div
                    variants={fadeInUp}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <a
                        href="#projects"
                        className="group px-8 py-4 text-white rounded-full font-semibold inline-flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105"
                        style={{
                            backgroundColor: '#ff6b6b',
                            fontFamily: "'DM Sans', sans-serif",
                            boxShadow: '0 0 0 rgba(255,107,107,0)',
                        }}
                        onMouseEnter={(e) => {
                            (e.target as HTMLElement).style.boxShadow = '0 16px 40px rgba(255,107,107,0.35)';
                        }}
                        onMouseLeave={(e) => {
                            (e.target as HTMLElement).style.boxShadow = '0 0 0 rgba(255,107,107,0)';
                        }}
                    >
                        View My Work
                        <IconArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                    {data.personalInfo.linkedin && (
                        <a
                            href={data.personalInfo.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-4 text-white rounded-full font-medium inline-flex items-center justify-center gap-2 transition-all duration-200 hover:bg-white/10"
                            style={{
                                border: '2px solid rgba(255,255,255,0.15)',
                                fontFamily: "'DM Sans', sans-serif",
                            }}
                        >
                            <IconDownload size={20} />
                            Get in Touch
                        </a>
                    )}
                </motion.div>

                {/* Stats row */}
                {data.stats && data.stats.length > 0 && (
                    <motion.div
                        variants={fadeInUp}
                        className="mt-16 flex flex-wrap justify-center gap-10"
                    >
                        {data.stats.map((stat: any, i: number) => (
                            <div key={i} className="text-center">
                                <div
                                    className="text-3xl md:text-4xl font-bold"
                                    style={{ color: '#ff6b6b', fontFamily: "'DM Serif Display', serif" }}
                                >
                                    {stat.value}
                                </div>
                                <div className="text-sm mt-1" style={{ color: '#6b6b6b', fontFamily: "'DM Sans', sans-serif" }}>
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                )}
            </motion.div>

            {/* Floating avatar on large screens */}
            <motion.div
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 0.7, x: 0 }}
                transition={{ delay: 0.8, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:block pointer-events-none"
            >
                <motion.div
                    animate={{ y: [0, -18, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <Image
                        src={data.personalInfo.gender === 'female' ? "/assets/dev-avatar-girl.png" : "/assets/dev-avatar.png"}
                        alt={data.personalInfo.name}
                        width={280}
                        height={280}
                        className="select-none"
                        style={{ filter: 'drop-shadow(0 0 60px rgba(255,107,107,0.2))' }}
                    />
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                {/* <span className="text-xs tracking-widest uppercase" style={{ color: '#444', fontFamily: "'DM Sans', sans-serif" }}>
                    Scroll
                </span> */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-5 h-9 rounded-full flex justify-center pt-1.5"
                    style={{ border: '1.5px solid #333' }}
                >
                    <div className="w-1 h-2 rounded-full" style={{ backgroundColor: '#ff6b6b' }} />
                </motion.div>
            </motion.div>
        </section>
    );
}
