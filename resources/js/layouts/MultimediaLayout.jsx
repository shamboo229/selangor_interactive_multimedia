import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function MultimediaLayout({ children }) {
    const { url } = usePage();
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const root = window.document.documentElement;
        if (darkMode) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    return (
        <div className="min-h-screen transition-colors duration-300 font-sans bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
            <div className="hidden sm:flex py-2 px-6 text-[10px] justify-between items-center tracking-[0.2em] font-black uppercase bg-slate-900 text-slate-400 dark:bg-black dark:text-slate-500">
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-red-600" />
                    Portal Rasmi Multimedia Negeri Selangor
                </div>
                <div className="flex gap-4 items-center">
                    <span className="opacity-60">{new Date().toLocaleDateString('ms-MY', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
            </div>

            <nav className="sticky top-0 z-50 shadow-sm border-b transition-colors duration-300 bg-white/80 backdrop-blur-xl border-slate-200 dark:bg-slate-900/80 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex justify-between h-20">
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center gap-3 group">
                                <div className="bg-slate-900 dark:bg-red-600 w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:rotate-6">
                                    <span className="font-black text-base text-white">SIM</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-black text-lg tracking-tighter leading-none dark:text-white">
                                        SELANGOR<span className="text-red-600 italic">INTERACTIVE</span>
                                    </span>
                                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-50 dark:text-slate-400">
                                        Multimedia Hub
                                    </span>
                                </div>
                            </Link>
                        </div>
                        <div className="hidden lg:flex items-center space-x-1">
                            <NavLink href="/" active={url === '/'}>Live</NavLink>
                            <NavLink href="/karya" active={url === '/karya'}>Karya Kreatif</NavLink>
                            <NavLink href="/arkib" active={url === '/arkib'}>Arkib Digital</NavLink>
                            <NavLink href="/berita" active={url === '/berita'}>Info Semasa</NavLink>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setDarkMode(!darkMode)}
                                className="p-2.5 rounded-xl transition-all hover:scale-110 active:scale-90 bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-yellow-400"
                            >
                                {darkMode ? '☀️' : '🌙'}
                            </button>

                            <div className="h-8 w-[1px] mx-2 hidden sm:block bg-slate-200 dark:bg-slate-800" />

                            <Link href="/admin" className="bg-red-600 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-700 transition-all shadow-lg shadow-red-600/20">
                                Akses Pentadbir
                            </Link>
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 dark:text-white">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                {isMenuOpen && (
                    <div className="lg:hidden bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 p-6 space-y-4">
                        <div className="grid grid-cols-1 gap-2">
                            <MobileNavLink href="/">Utama</MobileNavLink>
                            <MobileNavLink href="/karya">Karya Kreatif</MobileNavLink>
                            <MobileNavLink href="/arkib">Arkib Digital</MobileNavLink>
                            <MobileNavLink href="/berita">Info Semasa</MobileNavLink>
                            <MobileNavLink href="/login">Pentadbir</MobileNavLink>
                        </div>
                    </div>
                )}
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>

            {/* Footer */}
            <footer className="border-t border-slate-200 dark:border-slate-800 py-12 mt-12 bg-white dark:bg-slate-950">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
                        © 2026 Selangor Interactive Media • Portal Rasmi
                    </p>
                </div>
            </footer>
        </div>
    );
}
function NavLink({ href, children, active = false, className = "", ...props }) {
    return (
        <Link
            href={href}
            {...props}
            className={`px-5 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${
                active
                ? 'text-red-600 bg-red-50 dark:bg-red-950/30'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            } ${className}`}
        >
            {children}
        </Link>
    );
}
function MobileNavLink({ href, children, className = "", ...props }) {
    return (
        <Link
            href={href}
            {...props}
            className={`block w-full px-4 py-4 text-xs font-black uppercase tracking-widest rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 ${className}`}
        >
            {children}
        </Link>
    );
}
