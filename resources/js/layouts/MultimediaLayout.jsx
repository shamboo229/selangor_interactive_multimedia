import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function MultimediaLayout({ children, auth }) {
    const { url } = usePage();
    // Initialize state from localStorage
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isAdminPath = url.startsWith('/admin');

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
        /* Added dark:bg-slate-950 and dark:text-white to the main wrapper */
        <div className={`min-h-screen transition-colors duration-300 font-sans
            ${isAdminPath
                ? 'bg-slate-950 text-white'
                : 'bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100'}`}>

            {/* TOP UTILITY BAR */}
            <div className={`hidden sm:flex py-2 px-6 text-[10px] justify-between items-center tracking-[0.2em] font-black uppercase
                ${isAdminPath
                    ? 'bg-red-700 text-white border-b border-red-800'
                    : 'bg-slate-900 text-slate-400 dark:bg-black dark:text-slate-500'}`}>
                <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isAdminPath ? 'bg-white' : 'bg-red-600'}`} />
                    {isAdminPath ? 'SIM COMMAND CENTER • Sesi Pentadbir Aktif' : 'Portal Rasmi Multimedia Negeri Selangor'}
                </div>
                <div className="flex gap-4 items-center">
                    <span className="opacity-60">{new Date().toLocaleDateString('ms-MY', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
            </div>

            {/* MAIN NAVIGATION */}
            <nav className={`sticky top-0 z-50 shadow-sm border-b transition-colors duration-300
                ${isAdminPath
                    ? 'bg-slate-900 border-slate-800'
                    : 'bg-white/80 backdrop-blur-xl border-slate-200 dark:bg-slate-900/80 dark:border-slate-800'}`}>
                <div className={`${isAdminPath ? 'max-w-[1600px]' : 'max-w-7xl'} mx-auto px-4 sm:px-6`}>
                    <div className="flex justify-between h-20">

                        {/* LEFT: Logo */}
                        <div className="flex items-center">
                            <Link href={isAdminPath ? "/admin" : "/"} className="flex items-center gap-3 group">
                                <div className={`${isAdminPath ? 'bg-red-600' : 'bg-slate-900 dark:bg-red-600'} w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:rotate-6`}>
                                    <span className="font-black text-base text-white">SIM</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-black text-lg tracking-tighter leading-none dark:text-white">
                                        {isAdminPath ? 'CENTRAL' : 'SELANGOR'}<span className="text-red-600 italic">{isAdminPath ? 'IZED' : 'INTERACTIVE'}</span>
                                    </span>
                                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-50 dark:text-slate-400">
                                        {isAdminPath ? 'Governance Suite' : 'Multimedia Hub'}
                                    </span>
                                </div>
                            </Link>
                        </div>

                        {/* CENTER: Navigation */}
                        <div className="hidden lg:flex items-center space-x-1">
                            {isAdminPath ? (
                                <>
                                    <NavLink href="/admin" active={url === '/admin'} isAdmin={true}>Dashboard</NavLink>
                                    <NavLink href="/admin/live-control" active={url === '/admin/live-control'} isAdmin={true}>Orchestrator</NavLink>
                                    <NavLink href="/admin/moderation" active={url === '/admin/moderation'} isAdmin={true} className="relative">
                                        Moderasi
                                        <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full animate-ping" />
                                    </NavLink>
                                    <NavLink href="/admin/analytics" active={url === '/admin/analytics'} isAdmin={true}>Analitik</NavLink>
                                </>
                            ) : (
                                <>
                                    <NavLink href="/" active={url === '/'}>Live</NavLink>
                                    <NavLink href="/karya" active={url === '/karya'}>Karya Kreatif</NavLink>
                                    <NavLink href="/arkib" active={url === '/arkib'}>Arkib Digital</NavLink>
                                    <NavLink href="/berita" active={url === '/berita'}>Info Semasa</NavLink>
                                </>
                            )}
                        </div>

                        {/* RIGHT: Tools */}
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setDarkMode(!darkMode)}
                                className={`p-2.5 rounded-xl transition-all hover:scale-110 active:scale-90
                                    ${isAdminPath
                                        ? 'bg-slate-800 text-slate-400 hover:text-white'
                                        : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-yellow-400'}`}
                            >
                                {darkMode ? '☀️' : '🌙'}
                            </button>

                            <div className={`h-8 w-[1px] mx-2 hidden sm:block ${isAdminPath ? 'bg-slate-800' : 'bg-slate-200 dark:bg-slate-800'}`} />

                            {isAdminPath ? (
                                <Link method="post" href="/" as="button" className="bg-white text-slate-900 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-lg">
                                    Log Keluar
                                </Link>
                            ) : (
                                <Link href="/admin" className="bg-red-600 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-700 transition-all shadow-lg shadow-red-600/20">
                                    Akses Pentadbir
                                </Link>
                            )}

                            {/* Mobile Toggle */}
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 dark:text-white">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* MOBILE MENU */}
                {isMenuOpen && (
                    <div className="lg:hidden bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 p-6 space-y-4">
                        <div className="grid grid-cols-1 gap-2">
                            {isAdminPath ? (
                                <>
                                    <MobileNavLink href="/admin">Dashboard</MobileNavLink>
                                    <MobileNavLink href="/admin/live-control">Orchestrator</MobileNavLink>
                                    <MobileNavLink href="/logout" method="post" as="button" className="text-red-600">Log Keluar</MobileNavLink>
                                </>
                            ) : (
                                <>
                                    <MobileNavLink href="/">Utama</MobileNavLink>
                                    <MobileNavLink href="/karya">Karya Kreatif</MobileNavLink>
                                    <MobileNavLink href="/login">Pentadbir</MobileNavLink>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </nav>

            {/* MAIN CONTENT AREA */}
            <main className={`${isAdminPath ? 'max-w-[1600px]' : 'max-w-7xl'} mx-auto px-4 sm:px-6 lg:px-8 py-8`}>
                {children}
            </main>

            {/* CONDITIONAL FOOTER */}
            {!isAdminPath && (
                <footer className="border-t border-slate-200 dark:border-slate-800 py-12 mt-12 bg-white dark:bg-slate-950">
                    <div className="max-w-7xl mx-auto px-6 text-center">
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
                            © 2026 Selangor Interactive Media • Portal Rasmi
                        </p>
                    </div>
                </footer>
            )}
        </div>
    );
}

function NavLink({ href, children, active = false, isAdmin = false, className = "", ...props }) {
    return (
        <Link
            href={href}
            {...props}
            className={`px-5 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${
                active
                ? (isAdmin ? 'text-white bg-red-600' : 'text-red-600 bg-red-50 dark:bg-red-950/30')
                : (isAdmin
                    ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800')
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
