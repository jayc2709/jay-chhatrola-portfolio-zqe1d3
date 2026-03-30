'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { fadeInScale, staggerFastest } from '@/lib/animations';
import { IconExternalLink, IconBrandGithub } from '@tabler/icons-react';

// Deterministic tilt angles based on index (avoid Math.random() SSR issues)
const TILTS = [-1.5, 1, -0.8, 1.5, -1.2, 0.9];

function ProjectBentoCard({ project, featured = false, tilt = 0 }: any) {
    // Different gradient accents per project for visual variety
    const accentGradients: Record<string, string> = {
        '#f0f4ff': 'from-blue-500/20 to-purple-500/10',
        '#f0fff4': 'from-emerald-500/20 to-teal-500/10',
        '#fffbf0': 'from-amber-500/20 to-orange-500/10',
        '#fff0f3': 'from-rose-500/20 to-pink-500/10',
    };
    const accentGrad = accentGradients[project.color] || 'from-[#ff6b6b]/15 to-transparent';

    return (
        <motion.div
            variants={fadeInScale}
            whileHover={{
                scale: 1.025,
                rotate: 0,
                y: -8,
                transition: { duration: 0.3, ease: 'easeOut' },
            }}
            className="group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300"
            style={{
                backgroundColor: '#161616',
                border: '1px solid rgba(255,255,255,0.1)',
                rotate: `${tilt}deg`,
                gridRow: 'span 1',
                gridColumn: 'span 1',
                height: '340px',
                boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)',
            }}
        >
            {/* Gradient background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${accentGrad} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

            {/* Glow on hover */}
            <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ boxShadow: 'inset 0 0 0 1px rgba(255,107,107,0.25)' }}
            />

            {/* Decorative pattern */}
            <div className="absolute top-0 right-0 w-48 h-48 opacity-10 group-hover:opacity-20 transition-opacity">
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        background: 'radial-gradient(circle at top right, #60A5FA, transparent 75%)',
                    }}
                />
            </div>

            {/* Project ID watermark */}
            <div
                className="absolute bottom-4 right-6 select-none"
                style={{
                    fontSize: '80px',
                    fontFamily: "'DM Serif Display', serif",
                    color: 'rgba(255,255,255,0.03)',
                    lineHeight: 1,
                    fontWeight: 900,
                }}
            >
                {project.id}
            </div>

            {/* Content */}
            <div className="relative z-10 p-6 md:p-7 h-full flex flex-col justify-between">
                {/* Top section */}
                <div>

                    <h3
                        className="font-bold text-white mb-2 group-hover:text-[#ff6b6b] transition-colors duration-200"
                        style={{
                            fontFamily: "'DM Serif Display', serif",
                            fontSize: '24px',
                        }}
                    >
                        {project.name}
                    </h3>

                    <p
                        className="text-sm leading-relaxed mb-4"
                        style={{ color: '#909090', fontFamily: "'DM Sans', sans-serif" }}
                    >
                        {project.shortDescription}
                    </p>
                </div>

                {/* Bottom section */}
                <div>
                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-2 mb-5">
                        {project.technologies.slice(0, 4).map((tech: string) => (
                            <span
                                key={tech}
                                className="px-2.5 py-1 text-xs rounded-md"
                                style={{
                                    backgroundColor: 'rgba(255,255,255,0.05)',
                                    color: '#888',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    fontFamily: "'JetBrains Mono', monospace",
                                }}
                            >
                                {tech}
                            </span>
                        ))}
                    </div>

                    {/* Links */}
                    <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        {project.link && (
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 hover:text-[#ff5252]"
                                style={{ color: '#ff6b6b', fontFamily: "'DM Sans', sans-serif" }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <IconExternalLink size={15} />
                                Live Demo
                            </a>
                        )}
                        {project.github && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors duration-200"
                                style={{ fontFamily: "'DM Sans', sans-serif" }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <IconBrandGithub size={15} />
                                Code
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default function Projects({ data }: any) {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });

    return (
        <section
            id="projects"
            ref={ref}
            className="relative py-24 md:py-36 px-6"
            style={{ backgroundColor: '#0a0a0a' }}
        >
            {/* Subtle background glow */}
            <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                style={{
                    width: '800px',
                    height: '400px',
                    background: 'radial-gradient(ellipse, rgba(255,107,107,0.04) 0%, transparent 70%)',
                }}
            />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="mb-16 text-center"
                >
                    <span
                        className="text-xs uppercase tracking-widest font-semibold"
                        style={{ color: '#ff6b6b', fontFamily: "'DM Sans', sans-serif" }}
                    >
                        02 — Portfolio
                    </span>
                    <h2
                        className="text-5xl md:text-7xl font-bold text-white mt-4 mb-4"
                        style={{ fontFamily: "'DM Serif Display', serif" }}
                    >
                        Selected Work
                    </h2>
                    <p
                        className="text-lg max-w-xl mx-auto"
                        style={{ color: '#606060', fontFamily: "'DM Sans', sans-serif" }}
                    >
                        A collection of projects I'm proud to have created
                    </p>
                </motion.div>

                {/* Bento Grid */}
                <motion.div
                    variants={staggerFastest}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-[340px]"
                >
                    {data.projects.map((project: any, i: number) => (
                        <ProjectBentoCard
                            key={project.id}
                            project={project}
                            featured={project.featured}
                            tilt={TILTS[i % TILTS.length]}
                        />
                    ))}
                </motion.div>

                {data.personalInfo.github && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.6 }}
                        className="mt-14 text-center"
                    >
                        <a
                            href={data.personalInfo.github.startsWith('http') ? data.personalInfo.github : `https://github.com/${data.personalInfo.github.replace('github.com/', '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-10 py-3.5 rounded-full font-semibold transition-all duration-300 hover:bg-[#ff6b6b] hover:text-white hover:shadow-lg"
                            style={{
                                border: '2px solid #ff6b6b',
                                color: '#ff6b6b',
                                fontFamily: "'DM Sans', sans-serif",
                            }}
                        >
                            View All Projects on GitHub
                        </a>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
