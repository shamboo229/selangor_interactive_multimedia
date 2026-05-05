import React, { useEffect } from 'react';
import MultimediaLayout from '@/Layouts/MultimediaLayout';
import { Head, useForm } from '@inertiajs/react';
import ReactPlayer from 'react-player';

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

    return (
        <MultimediaLayout auth={auth}>
            <Head title="SIM Command Center" />

            <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f1a] p-4 lg:p-8 text-slate-900 dark:text-white">

                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-5xl font-black uppercase tracking-tighter">SIM <span className="text-red-600">DASHBOARD</span></h1>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.4em] mt-1">Selangor Information Management • v2.4.0</p>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                    {/* LEFT: MASSIVE VIDEO PREVIEW (Matches Homepage) */}
                    <div className="xl:col-span-9">
                        <div className="bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl border-[12px] border-slate-200 dark:border-slate-800">
                            <div className="relative aspect-[21/9] w-full bg-black">
                                <ReactPlayer
                                    key={data.url}
                                    url={`https://www.youtube.com/watch?v=${data.url}`}
                                    width="100%"
                                    height="100%"
                                    controls={true}
                                    playing={true}
                                    muted={true}
                                />
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: STREAM ORCHESTRATOR */}
                    <div className="xl:col-span-3 space-y-6">
                        <div className="bg-white dark:bg-slate-800/40 backdrop-blur-md p-8 rounded-[2rem] shadow-xl border border-slate-200 dark:border-slate-700/50">
                            <h2 className="text-sm font-black uppercase mb-6">Stream Orchestrator</h2>
                            <form onSubmit={submitLiveUpdate} className="space-y-4">
                                <div>
                                    <label className="text-[9px] font-black uppercase text-slate-400">Broadcast Title</label>
                                    <input
                                        value={data.title}
                                        onChange={e => setData('title', e.target.value)}
                                        className="w-full bg-slate-100 dark:bg-slate-900 border-none rounded-xl p-3 mt-1 outline-none"
                                        placeholder="Enter title..."
                                    />
                                </div>
                                <div>
                                    <label className="text-[9px] font-black uppercase text-slate-400">YouTube ID</label>
                                    <input
                                        value={data.url}
                                        onChange={e => setData('url', e.target.value)}
                                        className="w-full bg-slate-100 dark:bg-slate-900 border-none rounded-xl p-3 mt-1 font-mono outline-none"
                                        placeholder="e.g. dQw4w9WgXcQ"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-4 rounded-xl uppercase tracking-widest text-xs transition-all"
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
