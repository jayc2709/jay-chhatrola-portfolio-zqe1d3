'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { IconMenu2, IconX } from '@tabler/icons-react';

export default function Navbar({ data }: any) {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { label: 'Work', href: '#projects' },
        { label: 'About', href: '#about' },
        { label: 'Experience', href: '#experience' },
        { label: 'Contact', href: '#contact' },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
            style={{
                backgroundColor: isScrolled ? 'rgba(0,0,0,0.85)' : 'transparent',
                backdropFilter: isScrolled ? 'blur(20px)' : 'none',
                borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.08)' : 'none',
            }}
        >
            <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
                {/* Logo/Name */}
                <a
                    href="#"
                    className="text-2xl text-white transition-colors duration-200 hover:text-[#ff6b6b]"
                    style={{ fontFamily: "'DM Serif Display', serif" }}
                >
                    {data.personalInfo.name.split(' ')[0]}
                </a>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="relative text-sm text-gray-400 hover:text-[#ff6b6b] transition-colors duration-200 group"
                            style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                            {link.label}
                            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#ff6b6b] group-hover:w-full transition-all duration-300" />
                        </a>
                    ))}

                    <a
                        href="#contact"
                        className="px-6 py-2.5 bg-[#ff6b6b] text-white rounded-full hover:bg-[#ff5252] transition-all duration-200 text-sm font-medium"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                        Let's Talk
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-white p-1"
                    aria-label="Toggle menu"
                >
                    {isOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="md:hidden"
                    style={{
                        backgroundColor: 'rgba(0,0,0,0.95)',
                        borderTop: '1px solid rgba(255,255,255,0.08)',
                    }}
                >
                    <div className="px-6 py-5 flex flex-col gap-5">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="text-white hover:text-[#ff6b6b] transition-colors duration-200 text-lg"
                                style={{ fontFamily: "'DM Sans', sans-serif" }}
                            >
                                {link.label}
                            </a>
                        ))}
                        <a
                            href="#contact"
                            onClick={() => setIsOpen(false)}
                            className="inline-block px-6 py-3 bg-[#ff6b6b] text-white rounded-full text-center font-medium hover:bg-[#ff5252] transition-all duration-200"
                        >
                            Let's Talk
                        </a>
                    </div>
                </motion.div>
            )}
        </motion.nav>
    );
}
