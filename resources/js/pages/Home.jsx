import React from 'react';
import MultimediaLayout from '@/Layouts/MultimediaLayout';
import VideoCard from '@/Components/VideoCard';
import { Head } from '@inertiajs/react';

export default function Home({ auth, featuredLive, archiveVideos }) {

    const liveData = featuredLive || [];

    const videos = archiveVideos || [];

    return (
        <MultimediaLayout auth={auth}>
            <Head title="Utama - Portal Multimedia Selangor" />

            <div className="relative overflow-hidden bg-red-600 text-white py-3 px-4 mb-10 rounded-2xl flex items-center shadow-2xl">
                <div className="z-10 bg-white text-red-700 text-m font-black px-3 py-1 rounded-lg mr-4 shadow-md flex-shrink-0">
                    PENGUMUMAN
                </div>
                <marquee className="text-m font-bold tracking-wide uppercase">
                    • {liveData.isLive ? `${liveData.title} sedang berlangsung •` : 'Sertai komuniti multimedia Selangor •'}
                    Daftar Skim Mesra Usia Emas (SMUE) di portal rasmi •
                    Pantau amaran cuaca di media sosial rasmi Kerajaan Negeri •
                </marquee>
                <div className="absolute -right-10 top-0 w-32 h-full bg-white/20 blur-3xl rotate-12"></div>
            </div>

            <section className="mb-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <span className="relative flex h-3 w-3">
                                {liveData.isLive && (
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                )}
                                <span className={`relative inline-flex rounded-full h-3 w-3 ${liveData.isLive ? 'bg-red-600' : 'bg-slate-400'}`}></span>
                            </span>
                            <h2 className="text-xs font-black text-red-600 uppercase tracking-[0.3em]">
                                {liveData.isLive ? 'Siaran Langsung' : 'Siaran Arkib'}
                            </h2>
                        </div>
                        <h1 className="text-4xl font-black tracking-tighter uppercase leading-none">
                            {liveData.isLive ? 'Paparan Utama' : 'Sorotan Pilihan'}
                        </h1>
                    </div>

                    {liveData.isLive && (
                        <div className="bg-slate-200 px-4 py-2 rounded-xl border border-slate-300">
                            <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">
                                LIVE STREAM TIDAK AKTIF
                            </span>
                        </div>
                    )}

                </div>

                <VideoCard
                    title={liveData.title}
                    category={liveData.category}
                    description={liveData.description}
                    isLive={liveData.isLive}
                    videoId={liveData.videoId}
                />
            </section>

            <section className="mt-20">
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
                        <div key={video.id} className="group cursor-pointer">
                            <div className="relative aspect-video rounded-3xl overflow-hidden mb-4 shadow-xl bg-slate-200 border border-transparent group-hover:border-red-500/50 transition-all">
                                <img
                                    src={video.thumbnail || `https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    alt={video.title}
                                />
                                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                        <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-red-600 border-b-[6px] border-b-transparent ml-1"></div>
                                    </div>
                                </div>
                                <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md text-[10px] text-white px-2 py-1 rounded-lg font-bold">
                                    {video.duration || '00:00'}
                                </div>
                            </div>
                            <div className="px-1">
                                <h4 className="font-black text-sm leading-tight group-hover:text-red-600 transition-colors line-clamp-2">
                                    {video.title}
                                </h4>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="w-1 h-1 bg-slate-400 rounded-full"></span>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                                        {video.date || 'Baru Dimuatnaik'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </MultimediaLayout>
    );
}
