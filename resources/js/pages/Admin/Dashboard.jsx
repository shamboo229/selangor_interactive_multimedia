import React, { useEffect } from 'react';
import MultimediaLayout from '@/Layouts/MultimediaLayout';
import { Head, useForm } from '@inertiajs/react';

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

    const handleUrlChange = (e) => {
        let input = e.target.value;
        let finalId = input;
        if (input.includes('youtube.com') || input.includes('youtu.be')) {
            const match = input.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
            if (match && match[1]) {
                finalId = match[1];
            }
        }
        setData('url', finalId);
    };
    const ytId = data.url?.includes('http')
        ? data.url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/) !== null
            ? data.url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/)[1]
            : data.url
        : data.url;

    return (
        <MultimediaLayout auth={auth}>
            <Head title="SIM Command Center" />

            <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f1a] p-4 lg:p-8 text-slate-900 dark:text-white">
                <div className="mb-10">
                    <h1 className="text-5xl font-black uppercase tracking-tighter">SIM <span className="text-red-600">DASHBOARD</span></h1>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.4em] mt-1">Selangor Information Management • v2.4.0</p>
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                    <div className="xl:col-span-9">
                        <div className="bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl border-[12px] border-slate-200 dark:border-slate-800">
                            <div className="relative aspect-[21/9] w-full bg-black">
                                {ytId && ytId.length === 11 ? (
                                    <iframe
                                        className="absolute top-0 left-0 w-full h-full"
                                        src={`https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&rel=0&modestbranding=1`}
                                        title="Dashboard Preview"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                ) : (
                                    <div className="flex items-center justify-center w-full h-full text-slate-500 font-bold uppercase tracking-widest text-xs">
                                        Waiting for valid YouTube ID...
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="xl:col-span-3 space-y-6">
                        <div className="bg-white dark:bg-slate-800/40 backdrop-blur-md p-8 rounded-[2rem] shadow-xl border border-slate-200 dark:border-slate-700/50">
                            <h2 className="text-sm font-black uppercase mb-6">Stream Orchestrator</h2>
                            <form onSubmit={submitLiveUpdate} className="space-y-4">
                                <div>
                                    <label className="text-[9px] font-black uppercase text-slate-400">Broadcast Title</label>
                                    <input
                                        value={data.title}
                                        onChange={e => setData('title', e.target.value)}
                                        className="w-full bg-slate-100 dark:bg-slate-900 border-none rounded-xl p-3 mt-1 outline-none focus:ring-2 focus:ring-red-500"
                                        placeholder="Enter title..."
                                    />
                                </div>
                                <div>
                                    <label className="text-[9px] font-black uppercase text-slate-400">YouTube ID / URL</label>
                                    <input
                                        value={data.url}
                                        onChange={handleUrlChange}
                                        className="w-full bg-slate-100 dark:bg-slate-900 border-none rounded-xl p-3 mt-1 font-mono outline-none focus:ring-2 focus:ring-red-500"
                                        placeholder="Paste full URL or ID"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={processing || (data.url && data.url.length !== 11)}
                                    className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-900/50 text-white font-black py-4 rounded-xl uppercase tracking-widest text-xs transition-all"
                                >
                                    {processing ? 'DEPLOYING...' : 'DEPLOY TO PORTAL'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </MultimediaLayout>
    );
}
