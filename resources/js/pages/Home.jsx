import React from 'react';
import MultimediaLayout from '@/Layouts/MultimediaLayout';
import VideoCard from '@/Components/VideoCard';
import { Head } from '@inertiajs/react';

export default function Home({ auth, featuredLive, archiveVideos }) {
    // 1. DEBUG: Press F12 in your browser and check the Console tab to see this!
    console.log("Data direct dari Laravel:", featuredLive);

    // 2. BULLETPROOFING: If Laravel sent an array (e.g. using ->get()), grab the first item.
    const actualLiveData = Array.isArray(featuredLive) ? featuredLive[0] : featuredLive;
    const liveData = actualLiveData || {};
    const videos = archiveVideos || [];

    // 3. Check for ANY type of ID/URL column name your backend might be using
    const hasActiveStream = liveData.stream_url || liveData.url || liveData.stream_id || liveData.id;

    return (
        <MultimediaLayout auth={auth}>
            <Head title="Utama - Portal Multimedia Selangor" />

            <div className="relative overflow-hidden bg-red-600 text-white py-3 px-4 mb-8 rounded-2xl flex items-center shadow-lg">
                <div className="z-10 bg-white text-red-700 text-xs font-black px-3 py-1 rounded-lg mr-4 shadow-sm flex-shrink-0">
                    PENGUMUMAN
                </div>
                <marquee className="text-sm font-bold tracking-wide uppercase">
                    • {(liveData.is_active === true || liveData.is_active === 't' || liveData.is_active === 1) ? `${liveData.title} sedang berlangsung • ` : ''}
                    Daftar Skim Mesra Usia Emas (SMUE) di portal rasmi •
                    Pantau amaran cuaca di media sosial rasmi Kerajaan Negeri •
                </marquee>
            </div>

            <section className="-mt-8 mb-16">
                {/* Now passing the properly extracted liveData */}
                {hasActiveStream ? (
                    <VideoCard stream={liveData} />
                ) : (
                    <div className="bg-slate-200 dark:bg-slate-800 rounded-[2.5rem] aspect-[21/9] flex flex-col items-center justify-center text-slate-500 shadow-xl border-[12px] border-white dark:border-slate-900 mt-10">
                        <svg className="w-16 h-16 mb-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <h2 className="text-2xl font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Tiada Siaran Langsung</h2>
                        <p className="text-sm font-bold mt-2 uppercase tracking-widest">Sila kembali kemudian untuk siaran seterusnya.</p>
                    </div>
                )}
            </section>

            <section className="mt-10 px-4 md:px-8">
                <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-4">
                        <div className="w-2 h-8 bg-red-600 rounded-full"></div>
                        <h3 className="text-2xl font-black uppercase tracking-tight">
                            Arkib Terkini
                        </h3>
                    </div>
                    <button className="group text-[11px] font-black text-red-600 uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
                        Lihat Semua <span className="text-lg">→</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {videos.map((video) => (
                        <div key={video.stream_id} className="group cursor-pointer">
                            <div className="relative aspect-video rounded-3xl overflow-hidden mb-4 shadow-xl bg-slate-200 border border-transparent group-hover:border-red-500/50 transition-all">
                                <img
                                    src={video.thumbnail || `https://img.youtube.com/vi/${video.stream_url}/mqdefault.jpg`}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    alt={video.title}
                                />
                                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                        <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-red-600 border-b-[6px] border-b-transparent ml-1"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="px-1">
                                <h4 className="font-black text-sm leading-tight group-hover:text-red-600 transition-colors line-clamp-2">
                                    {video.title}
                                </h4>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </MultimediaLayout>
    );
}
