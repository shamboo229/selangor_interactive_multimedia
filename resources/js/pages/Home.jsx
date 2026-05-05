import React from 'react';
import MultimediaLayout from '@/Layouts/MultimediaLayout';
import VideoCard from '@/Components/VideoCard';
import { Head } from '@inertiajs/react';

export default function Home({ auth, featuredLive, archiveVideos }) {

    const liveData = featuredLive || {};
    const videos = archiveVideos || [];

    return (
        <MultimediaLayout auth={auth}>
            <Head title="Utama - Portal Multimedia Selangor" />

            <div className="relative overflow-hidden bg-red-600 text-white py-3 px-4 mb-8 rounded-2xl flex items-center shadow-lg">
                <div className="z-10 bg-white text-red-700 text-xs font-black px-3 py-1 rounded-lg mr-4 shadow-sm flex-shrink-0">
                    PENGUMUMAN
                </div>
                <marquee className="text-sm font-bold tracking-wide uppercase">
                    • {liveData.is_active ? `${liveData.title} sedang berlangsung •` : 'Sertai komuniti multimedia Selangor •'}
                    Daftar Skim Mesra Usia Emas (SMUE) di portal rasmi •
                    Pantau amaran cuaca di media sosial rasmi Kerajaan Negeri •
                </marquee>
            </div>

            <section className="-mt-8 mb-16">
                <VideoCard videoId={liveData.id || 2} />
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
                        <div key={video.id} className="group cursor-pointer">
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
