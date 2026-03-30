'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { fadeInUp, staggerFastest } from '@/lib/animations';

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
    Frontend: { bg: 'rgba(6,182,212,0.12)', text: '#22d3ee', border: 'rgba(6,182,212,0.3)' },
    Backend: { bg: 'rgba(16,185,129,0.12)', text: '#34d399', border: 'rgba(16,185,129,0.3)' },
    DevOps: { bg: 'rgba(245,158,11,0.12)', text: '#fbbf24', border: 'rgba(245,158,11,0.3)' },
    Tools: { bg: 'rgba(168,85,247,0.12)', text: '#c084fc', border: 'rgba(168,85,247,0.3)' },
    Design: { bg: 'rgba(236,72,153,0.12)', text: '#f472b6', border: 'rgba(236,72,153,0.3)' },
    Native: { bg: 'rgba(59,130,246,0.12)', text: '#60a5fa', border: 'rgba(59,130,246,0.3)' },
    'Cross-Platform': { bg: 'rgba(255,107,107,0.12)', text: '#ff6b6b', border: 'rgba(255,107,107,0.3)' },
    Database: { bg: 'rgba(234,88,12,0.12)', text: '#fb923c', border: 'rgba(234,88,12,0.3)' },
    Architecture: { bg: 'rgba(20,184,166,0.12)', text: '#2dd4bf', border: 'rgba(20,184,166,0.3)' },
    Other: { bg: 'rgba(107,114,128,0.12)', text: '#9ca3af', border: 'rgba(107,114,128,0.3)' },
};

function SkillPill({ skill }: { skill: any }) {
    const colors = CATEGORY_COLORS[skill.category] || CATEGORY_COLORS.Other;
    const sizeClass =
        skill.proficiency >= 90 ? 'text-sm px-5 py-2.5' :
            skill.proficiency >= 75 ? 'text-sm px-4 py-2' :
                'text-xs px-3 py-1.5';

    return (
        <motion.div
            variants={fadeInUp}
            whileHover={{
                scale: 1.1,
                y: -2,
                boxShadow: `0 8px 24px ${colors.text}30`,
                transition: { duration: 0.2 },
            }}
            className={`${sizeClass} inline-block font-medium rounded-full cursor-default select-none`}
            style={{
                backgroundColor: colors.bg,
                color: colors.text,
                border: `1px solid ${colors.border}`,
                fontFamily: "'DM Sans', sans-serif",
            }}
        >
            {skill.name}
        </motion.div>
    );
}

export default function Skills({ data }: any) {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

    // Group skills by category
    const grouped: Record<string, any[]> = {};
    for (const skill of data.skills) {
        const cat = skill.category || 'Other';
        if (!grouped[cat]) grouped[cat] = [];
        grouped[cat].push(skill);
    }
    // Sort within each category by proficiency desc
    for (const cat of Object.keys(grouped)) {
        grouped[cat].sort((a, b) => b.proficiency - a.proficiency);
    }

    return (
        <section
            id="skills"
            ref={ref}
            className="relative py-24 md:py-36 px-6"
            style={{ backgroundColor: '#0f0f0f' }}
        >
            {/* Background blob */}
            <div
                className="absolute bottom-0 left-0 pointer-events-none"
                style={{
                    width: '500px',
                    height: '500px',
                    background: 'radial-gradient(circle, rgba(255,176,136,0.06) 0%, transparent 70%)',
                }}
            />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <span
                        className="text-xs uppercase tracking-widest font-semibold"
                        style={{ color: '#ff6b6b', fontFamily: "'DM Sans', sans-serif" }}
                    >
                        03 — Expertise
                    </span>
                    <h2
                        className="text-5xl md:text-7xl font-bold text-white mt-4"
                        style={{ fontFamily: "'DM Serif Display', serif" }}
                    >
                        Skills &{' '}
                        <span style={{ color: '#ff6b6b' }}>Technologies</span>
                    </h2>
                </motion.div>

                {/* Skills by Category */}
                <div className="space-y-12">
                    {Object.entries(grouped).map(([category, skills]) => {
                        const colors = CATEGORY_COLORS[category] || CATEGORY_COLORS.Other;
                        return (
                            <motion.div
                                key={category}
                                initial="hidden"
                                animate={inView ? 'visible' : 'hidden'}
                                variants={staggerFastest}
                            >
                                <h3
                                    className="text-base font-semibold text-white mb-4 flex items-center gap-3"
                                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                                >
                                    <span
                                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                                        style={{ backgroundColor: colors.text }}
                                    />
                                    {category}
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {skills.map((skill: any) => (
                                        <SkillPill key={skill.name} skill={skill} />
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Learning callout */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 }}
                    className="mt-16 p-8 rounded-2xl"
                    style={{
                        backgroundColor: 'rgba(255,107,107,0.06)',
                        borderLeft: '4px solid #ff6b6b',
                        border: '1px solid rgba(255,107,107,0.15)',
                    }}
                >
                    <p
                        className="text-base leading-relaxed"
                        style={{ color: '#c0c0c0', fontFamily: "'DM Sans', sans-serif" }}
                    >
                        <span className="font-semibold" style={{ color: '#ff6b6b' }}>Always learning.</span>{' '}
                        Currently exploring AI/ML integration, advanced animations, and emerging cross-platform paradigms.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
