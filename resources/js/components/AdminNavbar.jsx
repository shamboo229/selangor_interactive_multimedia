import React from 'react';
import { Link } from '@inertiajs/react';

export default function AdminNavbar({ user }) {
    return (
        <nav className="bg-slate-900 border-b border-slate-800 py-3 px-8 sticky top-0 z-50">
            <div className="max-w-[1600px] mx-auto flex justify-between items-center">
                {/* Brand & Context */}
                <div className="flex items-center gap-6">
                    <Link href="/admin" className="flex items-center gap-3 group">
                        <div className="bg-red-600 p-1.5 rounded-lg group-hover:rotate-90 transition-transform">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                            </svg>
                        </div>
                        <div>
                            <span className="text-white font-black tracking-tighter text-lg uppercase leading-none block">SIM CENTRAL</span>
                            <span className="text-[9px] text-red-500 font-bold uppercase tracking-widest">Administrator</span>
                        </div>
                    </Link>

                    {/* Fast Nav */}
                    <div className="hidden md:flex items-center gap-1 border-l border-slate-800 ml-2 pl-6">
                        {['Dashboard', 'Users', 'Settings'].map((item) => (
                            <Link
                                key={item}
                                href="#"
                                className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white px-4 py-2 rounded-lg transition-colors"
                            >
                                {item}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* User & System Status */}
                <div className="flex items-center gap-6">
                    <div className="hidden lg:flex items-center gap-2 bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-[9px] font-black text-slate-300 uppercase tracking-tight">System Online</span>
                    </div>

                    <div className="flex items-center gap-3 pl-6 border-l border-slate-800">
                        <div className="text-right leading-none">
                            <div className="text-[11px] font-black text-white uppercase">{user?.name || 'Administrator'}</div>
                            <Link href={route('logout')} method="post" as="button" className="text-[9px] font-bold text-slate-500 hover:text-red-500 uppercase">Sign Out</Link>
                        </div>
                        <div className="w-9 h-9 bg-gradient-to-tr from-slate-700 to-slate-600 rounded-xl flex items-center justify-center border border-slate-500 shadow-inner">
                            <span className="text-xs font-black text-white">{(user?.name || 'A').charAt(0)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
