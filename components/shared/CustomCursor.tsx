'use client';
import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    const springConfig = { damping: 30, stiffness: 300 };
    const dotX = useSpring(mouseX, { damping: 50, stiffness: 500 });
    const dotY = useSpring(mouseY, { damping: 50, stiffness: 500 });
    const circleX = useSpring(mouseX, springConfig);
    const circleY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const move = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) return;
        window.addEventListener('mousemove', move);
        return () => window.removeEventListener('mousemove', move);
    }, [mouseX, mouseY]);

    return (
        <>
            <motion.div
                style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
                className="fixed top-0 left-0 w-2 h-2 bg-[#2563eb] rounded-full z-[9999] pointer-events-none hidden md:block"
            />
            <motion.div
                style={{ x: circleX, y: circleY, translateX: '-50%', translateY: '-50%' }}
                className="fixed top-0 left-0 w-8 h-8 border border-[#2563eb]/40 rounded-full z-[9998] pointer-events-none hidden md:block"
            />
        </>
    );
}
