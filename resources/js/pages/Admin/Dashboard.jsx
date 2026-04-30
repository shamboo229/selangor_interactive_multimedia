import React, { useState, useEffect } from 'react';
import MultimediaLayout from '@/Layouts/MultimediaLayout';
import { Head, useForm } from '@inertiajs/react';
import ReactPlayer from 'react-player';

export default function Dashboard({ auth, currentStream, pendingWorks = [], stats = {} }) {
    const [activeTab, setActiveTab] = useState('live');
    const [isDark, setIsDark] = useState(true);

    const { data, setData, post, processing } = useForm({
        title: currentStream?.title || '',
        url: currentStream?.url || '',
    });

    // Sync form when server-side data changes
    useEffect(() => {
        if (currentStream) {
            setData(prev => ({
                ...prev,
                title: currentStream.title || '',
                url: currentStream.url || '',
            }));
        }
    }, [currentStream]);

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    const submitLiveUpdate = (e) => {
        e.preventDefault();
        post(route('admin.stream.update'), {
            preserveScroll: true,
            onSuccess: () => alert('Stream updated successfully!')
        });
    };

    return (
        <MultimediaLayout auth={auth}>
            <Head title="SIM Command Center" />

            <div className="min-h-screen transition-colors duration-500 bg-slate-50 dark:bg-[#0b0f1a] p-4 lg:p-8 text-slate-900 dark:text-white">

                {/* Stats Bar */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: 'Total Reach', value: stats?.total_views ? `${(stats.total_views / 1000).toFixed(1)}k` : '0', change: '+12%', color: 'text-blue-500' },
                        { label: 'Avg. Watch Time', value: '12m 40s', change: '+5%', color: 'text-purple-500' },
                        { label: 'Server Load', value: '24%', change: 'Stable', color: 'text-green-500' },
                        { label: 'Pending Tasks', value: pendingWorks?.length || 0, change: 'Action Required', color: 'text-red-500' },
                    ].map((stat, i) => (
                        <div key={i} className="bg-white dark:bg-slate-800/40 backdrop-blur-md p-5 rounded-[2rem] shadow-xl border border-slate-200 dark:border-slate-700/50 transition-all">
                            <p className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest">{stat.label}</p>
                            <div className="flex items-baseline gap-2 mt-1">
                                <span className="text-2xl font-black text-slate-900 dark:text-white">{stat.value}</span>
                                <span className={`text-[10px] font-bold ${stat.color}`}>{stat.change}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col lg:flex-row justify-between mb-10 gap-6">
                    <div>
                        <h1 className="text-5xl font-black uppercase tracking-tighter dark:text-white text-slate-900">
                            SIM <span className="text-red-600">DASHBOARD</span>
                        </h1>
                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.4em] mt-1">
                            Selangor Information Management • v2.4.0
                        </p>
                    </div>

                    <div className="flex bg-slate-200 dark:bg-slate-800/80 p-1.5 rounded-2xl border border-slate-300 dark:border-slate-700 h-fit">
                        {['live', 'moderation', 'analytics', 'logs'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                    activeTab === tab
                                    ? 'bg-white dark:bg-red-600 text-red-600 dark:text-white shadow-xl scale-105'
                                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-3 space-y-8">
                        {activeTab === 'live' && (
                            <>
                                <div className="bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-slate-200 dark:border-slate-800 relative group">
                                    <div className="aspect-video bg-black flex items-center justify-center">
                                        {data.url && ReactPlayer.canPlay(data.url) ? (
                                            <div className="w-full h-full">
                                                <ReactPlayer
                                                    key={data.url} // Force re-render on change
                                                    url={data.url}
                                                    width="100%"
                                                    height="100%"
                                                    controls={true}
                                                    playing={true}
                                                    muted={true}
                                                    playsinline={true}
                                                    config={{
                                                        youtube: {
                                                            playerVars: {
                                                                autoplay: 1,
                                                                controls: 1,
                                                                modestbranding: 1
                                                            }
                                                        }
                                                    }}
                                                    onError={(e) => console.error("Playback Error:", e)}
                                                />
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center gap-4 text-slate-500">
                                                <div className="w-12 h-12 border-4 border-slate-700 border-t-red-600 rounded-full animate-spin"></div>
                                                <p className="font-black uppercase tracking-widest text-[10px]">
                                                    {data.url ? 'Invalid or Restricted Source' : 'Awaiting Signal Input'}
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="absolute top-8 left-8">
                                        <div className={`text-[10px] font-black px-4 py-1.5 rounded-full animate-pulse ${data.url ? 'bg-red-600 text-white' : 'bg-slate-700 text-slate-400'}`}>
                                            {data.url ? 'LIVE PREVIEW' : 'NO SIGNAL'}
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white dark:bg-slate-800/40 backdrop-blur-md p-10 rounded-[3rem] shadow-xl border border-slate-200 dark:border-slate-700/50">
                                    <h2 className="text-xl font-black uppercase mb-8 dark:text-white">Stream Orchestrator</h2>
                                    <form onSubmit={submitLiveUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase ml-2 text-slate-400">Broadcast Title</label>
                                            <input
                                                value={data.title}
                                                onChange={e => setData('title', e.target.value)}
                                                className="w-full bg-slate-50 dark:bg-slate-900/50 border-2 border-transparent focus:border-red-600 rounded-2xl p-4 transition-all dark:text-white outline-none"
                                                placeholder="e.g. Belanjawan Selangor 2026"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase ml-2 text-slate-400">Stream Source URL</label>
                                            <input
                                                value={data.url}
                                                onChange={e => setData('url', e.target.value)}
                                                className="w-full bg-slate-50 dark:bg-slate-900/50 border-2 border-transparent focus:border-red-600 rounded-2xl p-4 font-mono text-sm transition-all dark:text-white outline-none"
                                                placeholder="Paste YouTube or HLS link here..."
                                                required
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="md:col-span-2 bg-red-600 hover:bg-red-700 disabled:bg-slate-500 text-white font-black py-5 rounded-2xl uppercase tracking-[0.2em] shadow-xl shadow-red-600/20 transition-all active:scale-95"
                                        >
                                            {processing ? 'SYNCING...' : 'DEPLOY TO PUBLIC PORTAL'}
                                        </button>
                                    </form>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl border border-slate-800">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500 mb-6">Real-time Traffic</h3>
                            <div className="flex items-end gap-1 h-32 mb-4">
                                {[40, 70, 45, 90, 65, 80, 95, 70, 85, 100].map((h, i) => (
                                    <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-gradient-to-t from-red-600 to-red-400 rounded-t-sm opacity-80 hover:opacity-100 transition-all"></div>
                                ))}
                            </div>
                            <div className="text-3xl font-black">{stats?.active_users?.toLocaleString() || '0'}</div>
                            <p className="text-[10px] font-bold uppercase opacity-40">Live Viewers</p>
                        </div>

                        <div className="bg-white dark:bg-slate-800/40 backdrop-blur-md p-8 rounded-[2.5rem] shadow-xl border border-slate-200 dark:border-slate-700/50">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">System Logs</h3>
                            <div className="space-y-6">
                                {[
                                    { msg: 'Portal Cache Purged', time: '2m ago', icon: '⚡' },
                                    { msg: 'New Content Approved', time: '14m ago', icon: '✅' },
                                ].map((log, i) => (
                                    <div key={i} className="flex gap-4 items-start border-l-2 border-slate-100 dark:border-slate-700 pl-4">
                                        <span className="text-sm">{log.icon}</span>
                                        <div>
                                            <p className="text-[11px] font-black leading-none dark:text-white text-slate-900">{log.msg}</p>
                                            <p className="text-[9px] font-bold text-slate-400 uppercase mt-1">{log.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MultimediaLayout>
    );
}
