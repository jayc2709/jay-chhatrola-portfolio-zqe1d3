'use client';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Projects from './Projects';
import Skills from './Skills';
import Experience from './Experience';
import Contact from './Contact';

export default function DesignerDarkBento({ data }: { data: any }) {
    return (
        <div
            className="min-h-screen text-[#f5f5f5]"
            style={{
                backgroundColor: '#0f0f0f',
                fontFamily: "'DM Sans', sans-serif",
            }}
        >
            <Navbar data={data} />
            <Hero data={data} />
            <About data={data} />
            <Projects data={data} />
            <Skills data={data} />
            <Experience data={data} />
            <Contact data={data} />
        </div>
    );
}
