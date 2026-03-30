'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import {
    IconBrandGithub,
    IconBrandLinkedin,
    IconBrandTwitter,
    IconMail,
} from '@tabler/icons-react';

export default function Contact({ data }: any) {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.25 });

    const socials = [
        { icon: IconBrandGithub, href: data.socials?.github, label: 'GitHub' },
        { icon: IconBrandLinkedin, href: data.socials?.linkedin, label: 'LinkedIn' },
        { icon: IconBrandTwitter, href: data.socials?.twitter, label: 'Twitter' },
    ].filter((s) => s.href);

    return (
        <section
            id="contact"
            ref={ref}
            className="relative py-32 md:py-48 px-6 overflow-hidden"
            style={{ background: 'linear-gradient(to bottom, #0f0f0f 0%, #000 100%)' }}
        >
            {/* Animated background blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, 180, 0],
                        opacity: [0.18, 0.35, 0.18],
                    }}
                    transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
                    className="absolute rounded-full"
                    style={{
                        top: '-30%',
                        left: '-20%',
                        width: '700px',
                        height: '700px',
                        background: 'radial-gradient(circle, rgba(255,107,107,0.25) 0%, transparent 70%)',
                        filter: 'blur(80px)',
                    }}
                />
                <motion.div
                    animate={{
                        scale: [1.3, 1, 1.3],
                        rotate: [180, 0, 180],
                        opacity: [0.3, 0.15, 0.3],
                    }}
                    transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
                    className="absolute rounded-full"
                    style={{
                        bottom: '-30%',
                        right: '-20%',
                        width: '800px',
                        height: '800px',
                        background: 'radial-gradient(circle, rgba(255,176,136,0.2) 0%, transparent 70%)',
                        filter: 'blur(100px)',
                    }}
                />
            </div>

            {/* Content */}
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                className="relative z-10 max-w-4xl mx-auto text-center"
            >
                {/* Badge */}
                <motion.div variants={fadeInUp} className="mb-8">
                    <span
                        className="inline-block px-4 py-2 rounded-full text-sm"
                        style={{
                            backgroundColor: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            color: '#888',
                            fontFamily: "'DM Sans', sans-serif",
                        }}
                    >
                        05 — Let's Connect
                    </span>
                </motion.div>

                {/* Headline */}
                <motion.h2
                    variants={fadeInUp}
                    className="font-black text-white leading-tight mb-6"
                    style={{
                        fontFamily: "'DM Serif Display', serif",
                        fontSize: 'clamp(44px, 9vw, 100px)',
                    }}
                >
                    Let's create something{' '}
                    <span
                        style={{
                            background: 'linear-gradient(135deg, #ff6b6b, #ffb088)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                    >
                        amazing
                    </span>
                </motion.h2>

                {/* Subtitle */}
                <motion.p
                    variants={fadeInUp}
                    className="text-lg md:text-xl mb-12 mx-auto max-w-xl"
                    style={{ color: '#606060', fontFamily: "'DM Sans', sans-serif" }}
                >
                    Have a project in mind? Let's bring your vision to life.
                </motion.p>

                {/* Email CTA */}
                <motion.div variants={fadeInUp} className="mb-12">
                    <a
                        href={`mailto:${data.personalInfo.email}`}
                        className="group inline-flex items-center gap-3 px-10 py-5 text-white font-bold rounded-full transition-all duration-300 hover:scale-105"
                        style={{
                            background: 'linear-gradient(135deg, #ff6b6b, #ffb088)',
                            fontSize: '18px',
                            fontFamily: "'DM Sans', sans-serif",
                        }}
                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.boxShadow = '0 24px 60px rgba(255,107,107,0.45)';
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                        }}
                    >
                        <IconMail size={22} />
                        {data.personalInfo.email}
                    </a>
                </motion.div>

                {/* Social Links */}
                <motion.div
                    variants={fadeInUp}
                    className="flex justify-center gap-4 mb-20"
                >
                    {socials.map((social) => (
                        <a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.label}
                            className="p-4 rounded-full transition-all duration-200"
                            style={{
                                backgroundColor: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                color: '#888',
                            }}
                            onMouseEnter={(e) => {
                                const el = e.currentTarget as HTMLElement;
                                el.style.backgroundColor = 'rgba(255,107,107,0.12)';
                                el.style.borderColor = 'rgba(255,107,107,0.35)';
                                el.style.color = '#ff6b6b';
                            }}
                            onMouseLeave={(e) => {
                                const el = e.currentTarget as HTMLElement;
                                el.style.backgroundColor = 'rgba(255,255,255,0.05)';
                                el.style.borderColor = 'rgba(255,255,255,0.1)';
                                el.style.color = '#888';
                            }}
                        >
                            <social.icon size={22} />
                        </a>
                    ))}
                </motion.div>

                {/* Footer */}
                <motion.div
                    variants={fadeInUp}
                    className="pt-8"
                    style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
                >
                    <p className="text-sm" style={{ color: '#444', fontFamily: "'DM Sans', sans-serif" }}>
                        Designed & built with care by{' '}
                        <span style={{ color: '#ff6b6b' }}>{data.personalInfo.name}</span>
                    </p>
                    <p className="text-xs mt-2" style={{ color: '#333', fontFamily: "'DM Sans', sans-serif" }}>
                        © {new Date().getFullYear()} All rights reserved
                    </p>
                </motion.div>
            </motion.div>
        </section>
    );
}
