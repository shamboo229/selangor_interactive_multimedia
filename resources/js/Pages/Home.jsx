import React from 'react';
import MultimediaLayout from '@/Layouts/MultimediaLayout';
import VideoCard from '@/Components/VideoCard';
import NewsGrid from '@/Components/NewsGrid';
import ArchiveGrid from '@/Components/ArchiveGrid';
import AssetsGrid from '@/Components/AssetsGrid';
import { Head, Link } from '@inertiajs/react';

export default function Home({ auth, featuredLive, archiveVideos = [], latestNews = [], latestAssets = [], announcementText = '' }) {
    const liveData = (Array.isArray(featuredLive) ? featuredLive[0] : featuredLive) || {};
    const hasActiveStream = Boolean(liveData.stream_url || liveData.url || liveData.stream_id || liveData.id);

    return (
        <MultimediaLayout auth={auth}>
            <Head title="Utama - Portal Multimedia Selangor" />

            <div className="relative overflow-hidden bg-red-600 text-white py-3 px-4 mb-8 rounded-2xl flex items-center shadow-lg">
                <div className="z-10 bg-white text-red-700 text-xs font-black px-3 py-1 rounded-lg mr-4 shadow-sm flex-shrink-0">
                    PENGUMUMAN
                </div>
                <marquee className="text-sm font-bold tracking-wide uppercase">
                    • {announcementText}
                </marquee>
            </div>

            <section className="-mt-8 mb-16">
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

            <section className="mt-12 mb-16 px-4 md:px-8 max-w-[1800px] mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className="w-2 h-8 bg-blue-600 dark:bg-blue-500 rounded-full"></div>
                        <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
                            Berita & Info Semasa
                        </h3>
                    </div>
                    <Link href="/berita" className="group text-[11px] font-black text-red-600 uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">Semua Berita<span className="text-lg">→</span>
                    </Link>
                </div>

                <NewsGrid newsItems={latestNews} />
            </section>

            <section className="mt-10 px-4 md:px-8 max-w-[1800px] mx-auto">
                <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-4">
                        <div className="w-2 h-8 bg-red-600 rounded-full"></div>
                        <h3 className="text-2xl font-black uppercase tracking-tight dark:text-white">
                            Arkib Terkini
                        </h3>
                    </div>
                    <Link href="/arkib" className="group text-[11px] font-black text-red-600 uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">Lihat Semua <span className="text-lg">→</span>
                    </Link>
                </div>

                <ArchiveGrid videos={archiveVideos} />
            </section>

            <section className="mt-16 mb-16 px-4 md:px-8 max-w-[1800px] mx-auto">
                <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-4">
                        <div className="w-2 h-8 bg-amber-500 rounded-full"></div>
                        <h3 className="text-2xl font-black uppercase tracking-tight dark:text-white">
                            Karya Kreatif
                        </h3>
                    </div>
                    <Link href="/karya" className="group text-[11px] font-black text-red-600 uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">Muat Turun Karya<span className="text-lg">→</span>
                    </Link>
                </div>

                <AssetsGrid assets={latestAssets} />
            </section>
        </MultimediaLayout>
    );
}
