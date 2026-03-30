'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { fadeInUp, staggerContainer } from '@/lib/animations';

function ExperienceCard({ experience, index }: any) {
    const isLast = false; // handled by CSS

    return (
        <motion.div
            variants={fadeInUp}
            className="group relative pl-10 pb-12 last:pb-0"
        >
            {/* Timeline dot */}
            <div
                className="absolute left-0 top-1 w-4 h-4 rounded-full z-10 transition-all duration-300 group-hover:scale-125"
                style={{
                    backgroundColor: '#ff6b6b',
                    border: '3px solid #0f0f0f',
                    boxShadow: '0 0 0 1px rgba(255,107,107,0.3)',
                }}
            />

            {/* Timeline line */}
            <div
                className="absolute left-[7px] top-5 bottom-0 w-[1px] group-last:hidden transition-colors duration-300 group-hover:bg-[#ff6b6b]/20"
                style={{ backgroundColor: 'rgba(255,255,255,0.07)' }}
            />

            {/* Card */}
            <motion.div
                whileHover={{ x: 6 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="p-6 md:p-7 rounded-2xl transition-all duration-200"
                style={{
                    backgroundColor: '#1c1c1c',
                    border: '1px solid rgba(255,255,255,0.07)',
                }}
                onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,107,107,0.2)';
                    (e.currentTarget as HTMLElement).style.backgroundColor = '#202020';
                }}
                onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)';
                    (e.currentTarget as HTMLElement).style.backgroundColor = '#1c1c1c';
                }}
            >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                        <h3
                            className="text-xl md:text-2xl font-bold text-white mb-1 transition-colors duration-200 group-hover:text-[#ff6b6b]"
                            style={{ fontFamily: "'DM Serif Display', serif" }}
                        >
                            {experience.company}
                        </h3>
                        <p
                            className="font-semibold text-sm"
                            style={{ color: '#ff6b6b', fontFamily: "'DM Sans', sans-serif" }}
                        >
                            {experience.title}
                        </p>
                    </div>
                    <span
                        className="text-xs px-3 py-1.5 rounded-full mt-3 md:mt-0 self-start md:self-center"
                        style={{
                            color: '#888',
                            backgroundColor: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            fontFamily: "'JetBrains Mono', monospace",
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {experience.duration}
                    </span>
                </div>

                <p
                    className="text-sm leading-relaxed mb-4"
                    style={{ color: '#909090', fontFamily: "'DM Sans', sans-serif" }}
                >
                    {experience.description}
                </p>

                {/* Technologies */}
                {experience.technologies && experience.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech: string) => (
                            <span
                                key={tech}
                                className="px-3 py-1 text-xs rounded-full"
                                style={{
                                    backgroundColor: 'rgba(255,255,255,0.04)',
                                    color: '#777',
                                    border: '1px solid rgba(255,255,255,0.07)',
                                    fontFamily: "'JetBrains Mono', monospace",
                                }}
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
}

export default function Experience({ data }: any) {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <section
            id="experience"
            ref={ref}
            className="relative py-24 md:py-36 px-6"
            style={{ backgroundColor: '#0a0a0a' }}
        >
            {/* bg glow */}
            <div
                className="absolute top-0 right-0 pointer-events-none"
                style={{
                    width: '500px',
                    height: '500px',
                    background: 'radial-gradient(circle, rgba(255,107,107,0.05) 0%, transparent 70%)',
                }}
            />

            <div className="max-w-5xl mx-auto relative z-10">
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
                        04 — Journey
                    </span>
                    <h2
                        className="text-5xl md:text-7xl font-bold text-white mt-4"
                        style={{ fontFamily: "'DM Serif Display', serif" }}
                    >
                        Work{' '}
                        <span style={{ color: '#ff6b6b' }}>Experience</span>
                    </h2>
                </motion.div>

                {/* Timeline */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    className="relative"
                >
                    {data.experience.map((exp: any, index: number) => (
                        <ExperienceCard
                            key={exp.id || index}
                            experience={exp}
                            index={index}
                        />
                    ))}
                </motion.div>

                {/* Education callout */}
                {data.education && data.education.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.6 }}
                        className="mt-8 p-6 rounded-2xl flex items-center gap-5"
                        style={{
                            backgroundColor: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.07)',
                        }}
                    >
                        <div className="text-3xl">🎓</div>
                        <div>
                            <p className="font-semibold text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                                {data.education[0].degree}
                            </p>
                            <p className="text-sm mt-0.5" style={{ color: '#777', fontFamily: "'DM Sans', sans-serif" }}>
                                {data.education[0].institution} · {data.education[0].year}
                            </p>
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
