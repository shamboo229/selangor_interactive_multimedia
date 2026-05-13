import React, { useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import ReactPlayer from 'react-player'; // Added this import

export default function Dashboard({ auth, currentStream, stats = {} }) {
    const { data, setData, post, processing } = useForm({
        title: currentStream?.title || '',
        url: currentStream?.url || '',
    });

    useEffect(() => {
        setData({
            title: currentStream?.title || '',
            url: currentStream?.url || '',
        });
    }, [currentStream]);

    const submitLiveUpdate = (e) => {
        e.preventDefault();
        post(route('admin.stream.update'), {
            preserveScroll: true,
        });
    };

    // Updated to accept both YT URLs and .m3u8 URLs safely
    const handleUrlChange = (e) => {
        let input = e.target.value;

        // If it's a YouTube link, extract just the 11-character ID
        if (input.includes('youtube.com') || input.includes('youtu.be')) {
            const match = input.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
            if (match && match[1]) {
                setData('url', match[1]);
                return;
            }
        }

        // Otherwise (like an .m3u8 link), save the raw input
        setData('url', input);
    };

    // Helper to figure out what URL to feed the preview player
    const getPlaybackUrl = (urlStr) => {
        if (!urlStr) return null;
        // If it's exactly 11 chars with no dots, it's likely a YT ID
        if (urlStr.length === 11 && !urlStr.includes('.')) {
            return `https://www.youtube.com/watch?v=${urlStr}`;
        }
        // Otherwise, it's our direct stream URL
        return urlStr;
    };

    const playbackUrl = getPlaybackUrl(data.url);

    return (
        <AdminLayout auth={auth}>
            <Head title="Dashboard - SIM Workspace" />

            <div className="max-w-7xl mx-auto space-y-8">
                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">System Overview</h1>

                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-slate-500 text-sm font-medium">Total Articles</h3>
                                <p className="text-3xl font-bold text-slate-800 mt-2">{stats.articles || 124}</p>
                            </div>
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stream Orchestrator Section */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* Video Preview Column */}
                    <div className="xl:col-span-2">
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden h-full flex flex-col">
                            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                                <h2 className="text-base font-bold text-slate-800">Stream Output Preview</h2>
                                <span className="bg-slate-100 text-slate-500 text-xs px-3 py-1 rounded-full font-semibold">Live Module</span>
                            </div>
                            <div className="p-6 flex-1 flex flex-col justify-center bg-slate-50/50">
                                <div className="relative aspect-[16/9] w-full bg-[#0b1121] rounded-xl overflow-hidden shadow-inner ring-1 ring-slate-900/5">
                                    {playbackUrl ? (
                                        <ReactPlayer
                                            className="absolute top-0 left-0"
                                            url={playbackUrl}
                                            width="100%"
                                            height="100%"
                                            controls={true}
                                            playing={true}
                                            muted={true}
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center w-full h-full text-slate-500">
                                            <svg className="w-12 h-12 mb-3 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                                            <p className="font-medium text-sm">No valid broadcast source detected</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Orchestrator Form Column */}
                    <div className="xl:col-span-1">
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 h-full flex flex-col">
                            <div className="px-6 py-5 border-b border-slate-100">
                                <h2 className="text-base font-bold text-slate-800">Orchestration Settings</h2>
                            </div>
                            <div className="p-6 flex-1">
                                <form onSubmit={submitLiveUpdate} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Broadcast Title</label>
                                        <input
                                            value={data.title || ''}
                                            onChange={e => setData('title', e.target.value)}
                                            className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-4 focus:ring-red-500/10 focus:border-red-500 block p-3.5 outline-none"
                                            placeholder="e.g., Sidang DUN Live"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Stream URL or YouTube ID</label>
                                        <input
                                            value={data.url || ''}
                                            onChange={handleUrlChange}
                                            className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-4 focus:ring-red-500/10 focus:border-red-500 block p-3.5 font-mono outline-none"
                                            placeholder="http://.../mystream.m3u8 or YouTube URL"
                                        />
                                    </div>

                                    <div className="pt-4">
                                        {/* Removed the strict 11-character disable rule */}
                                        <button
                                            type="submit"
                                            disabled={processing || !data.url}
                                            className="w-full text-white bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 disabled:from-slate-300 disabled:to-slate-300 font-bold rounded-xl text-sm px-5 py-4 transition-all flex justify-center items-center gap-2"
                                        >
                                            {processing ? 'Deploying Update...' : 'Update Live Module'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
