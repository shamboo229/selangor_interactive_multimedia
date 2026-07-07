import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function AdminLayout({ auth, children }) {
    const { url } = usePage();
    const currentUrl = url || '';
    const checkActive = (path) => currentUrl.startsWith(path);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900 selection:bg-red-500 selection:text-white overflow-hidden">
            <aside className={`bg-[#0b1121] text-slate-400 flex flex-col border-r border-slate-800 overflow-hidden transition-all duration-300 ease-in-out whitespace-nowrap ${isSidebarOpen ? 'w-[280px]' : 'w-0 border-none'}`}>
                <div className="h-20 flex items-center px-8 border-b border-slate-800/60 shrink-0">
                    <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-700 rounded-lg flex items-center justify-center mr-3 shadow-lg shadow-red-500/20 shrink-0">
                        <span className="text-white font-black text-xs">SIM</span>
                    </div>
                    <span className="text-white font-bold text-lg tracking-wide">Workspace</span>
                </div>

                <nav className="flex-1 px-4 py-8 space-y-1 overflow-y-auto overflow-x-hidden">
                    <div className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Core</div>

                    <Link
                        href="/admin"
                        className={`flex items-center px-4 py-3 rounded-xl transition-all font-medium ${currentUrl === '/admin' ? 'bg-red-600/10 text-red-500 border border-red-500/10' : 'hover:bg-slate-800 hover:text-slate-100'}`}
                    >
                        <svg className={`w-5 h-5 mr-3 shrink-0 ${currentUrl === '/admin' ? '' : 'opacity-70'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                        Dashboard
                    </Link>

                    <Link
                        href="/admin/news"
                        className={`flex items-center px-4 py-3 rounded-xl transition-all font-medium ${checkActive('/admin/news') ? 'bg-red-600/10 text-red-500 border border-red-500/10' : 'hover:bg-slate-800 hover:text-slate-100'}`}
                    >
                        <svg className={`w-5 h-5 mr-3 shrink-0 ${checkActive('/admin/news') ? '' : 'opacity-70'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>
                        News Management
                    </Link>

                    <Link
                        href="/admin/assets"
                        className={`flex items-center px-4 py-3 rounded-xl transition-all font-medium ${checkActive('/admin/assets') ? 'bg-red-600/10 text-red-500 border border-red-500/10' : 'hover:bg-slate-800 hover:text-slate-100'}`}
                    >
                        <svg className={`w-5 h-5 mr-3 shrink-0 ${checkActive('/admin/assets') ? '' : 'opacity-70'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        Media Manager
                    </Link>

                    <div className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 mt-8">System</div>

                    <Link
                        href="/admin/users"
                        className={`flex items-center px-4 py-3 rounded-xl transition-all font-medium ${checkActive('/admin/users') ? 'bg-red-600/10 text-red-500 border border-red-500/10' : 'hover:bg-slate-800 hover:text-slate-100'}`}
                    >
                        <svg className={`w-5 h-5 mr-3 shrink-0 ${checkActive('/admin/users') ? '' : 'opacity-70'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                        Users & Roles
                    </Link>
                </nav>

                <div className="p-6 border-t border-slate-800/60 bg-slate-900/50 shrink-0 text-center">
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">SIM v2.4.0</p>
                </div>
            </aside>
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden h-screen">
                <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 z-10 shrink-0">
                    <div className="flex items-center">
                        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 -ml-2 text-slate-400 hover:text-slate-600 transition-colors rounded-full hover:bg-slate-100 focus:outline-none">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </button>
                    </div>
                    <div className="flex items-center gap-4 sm:gap-6">
                        <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors rounded-full hover:bg-slate-100">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
                        </button>
                        <div className="h-8 w-px bg-slate-200"></div>
                        <div className="flex items-center gap-3">
                            <div className="flex flex-col items-end">
                                <span className="text-sm font-bold text-slate-800 leading-tight">
                                    {auth?.user?.admin_name || auth?.user?.name || 'Administrator'}
                                </span>
                                <Link method="post" href="/logout" as="button" className="text-xs text-slate-500 hover:text-red-600 font-medium transition-colors">
                                    Sign out
                                </Link>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-bold overflow-hidden">
                                {(auth?.user?.admin_name || auth?.user?.name) ? (auth?.user?.admin_name || auth?.user?.name).charAt(0).toUpperCase() : 'A'}
                            </div>
                        </div>
                    </div>
                </header>
                <main className="flex-1 overflow-y-auto p-8 bg-slate-50">
                    {children}
                </main>
            </div>
        </div>
    );
}
