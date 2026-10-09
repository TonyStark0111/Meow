
import React from 'react';
import Link from 'next/link';
import { Github } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="mt-12 py-6 border-t border-gray-800 bg-prime-dark text-center text-sm text-gray-400">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">

                {/* Left: Brand & Links */}
                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                    <span className="font-bold tracking-tighter text-prime-blue uppercase">
                        Xeon<span className="text-white">Flix</span>
                    </span>
                    <nav className="flex gap-4">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <Link href="/about" className="hover:text-white transition-colors">About</Link>
                        <Link href="/dmca" className="hover:text-white transition-colors">DMCA</Link>
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
                    </nav>
                </div>

                {/* Right: Credits */}
                <div className="flex items-center gap-2 text-xs">
                    <span>
                        Made by <span className="text-gray-300 font-medium">Mr Xeon</span>
                    </span>
                    <a
                        href="https://t.me/MrXeontg"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition-colors"
                        aria-label="GitHub"
                    >
                        <Github className="w-4 h-4 ml-1" />
                    </a>
                </div>
            </div>

            {/* Bottom: Copyright & Disclaimer (Referencing Screenshot) */}
            <div className="container mx-auto px-4 mt-8 pt-6 border-t border-gray-800">
                <p className="text-gray-400 mb-2">&copy; 2026 XeonFlix. All Rights Reserved.</p>
                <p className="text-xs text-gray-500 max-w-2xl mx-auto leading-relaxed">
                    Xeonflix does not host, upload, or store any files. Titles shown here are indexed automatically from public sources and third-party services. The media stays on those platforms — we only provide links.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
