import React, { useState } from 'react';

export default function ArchiveGrid({ videos = [] }) {
    const [selectedVideo, setSelectedVideo] = useState(null);

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {videos.map((video) => (
                    <div
                        key={video.stream_id}
                        onClick={() => setSelectedVideo(video)}
                        className="group cursor-pointer block bg-white dark:bg-slate-900 p-3 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-red-100 dark:hover:border-red-900 transition-all duration-300"
                    >
                        <div className="relative aspect-video rounded-2xl overflow-hidden mb-3.5 bg-slate-200 border-2 border-transparent group-hover:border-red-500/30 transition-all">
                            <img
                                src={video.thumbnail || `https://img.youtube.com/vi/${video.stream_url}/mqdefault.jpg`}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                alt={video.title}
                            />
                            <div className="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 transform scale-90 group-hover:scale-100 transition-transform">
                                    <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[9px] border-l-white border-b-[5px] border-b-transparent ml-1"></div>
                                </div>
                            </div>
                        </div>
                        <div className="px-1.5 pb-1">
                            <h4 className="font-black text-xs leading-tight dark:text-white group-hover:text-red-600 transition-colors line-clamp-2">
                                {video.title}
                            </h4>
                            <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-widest">Rakaman Strim</p>
                        </div>
                    </div>
                ))}
            </div>

            {videos.length === 0 && (
                <div className="text-center py-20 bg-slate-100 dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
                    <span className="text-4xl">📁</span>
                    <p className="mt-4 text-slate-500 font-bold">Tiada rakaman arkib ditemui buat masa ini.</p>
                </div>
            )}

            {selectedVideo && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 animate-in fade-in duration-300"
                    role="dialog"
                >
                    <div
                        className="fixed inset-0 bg-slate-950/90 backdrop-blur-sm"
                        onClick={() => setSelectedVideo(null)}
                    ></div>
                    <div className="relative bg-white dark:bg-slate-900 w-full max-w-6xl max-h-[90vh] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col animate-in slide-in-from-bottom-8 zoom-in-95 duration-400 ease-out">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
                            <h2 className="text-base font-black dark:text-white truncate max-w-[80%]">
                                Sedang Dimainkan: <span className="font-medium text-slate-600 dark:text-slate-400">{selectedVideo.title}</span>
                            </h2>
                            <button
                                onClick={() => setSelectedVideo(null)}
                                className="text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50 p-2 rounded-full transition-colors"
                                aria-label="Tutup Player"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                        <div className="flex-grow bg-black">
                            <div className="aspect-video relative w-full h-full">
                                <iframe
                                    className="absolute inset-0 w-full h-full"
                                    src={`https://www.youtube.com/embed/${selectedVideo.stream_url}?autoplay=1&modestbranding=1&rel=0`}
                                    title={selectedVideo.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
