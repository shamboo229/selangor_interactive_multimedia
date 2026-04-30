import React, { useState } from 'react';

export default function VideoCard({ title, category, description, isLive, videoId }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="w-full bg-white dark:bg-slate-950 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-slate-800 flex flex-col md:flex-row mb-8 transition-colors duration-300">
            <div className="md:w-3/5 aspect-video bg-black relative group cursor-pointer" onClick={() => setIsOpen(true)}>
                <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center group-hover:scale-110 transition">
                        <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[15px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                    </div>
                </div>
                {isLive && (
                    <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-0.5 rounded text-[10px] font-black uppercase">
                        LIVE
                    </div>
                )}
            </div>

            <div className="md:w-2/5 p-6 flex flex-col justify-center">
                <span className="text-red-600 font-bold text-xs uppercase mb-1">{category}</span>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h2>
                <p className="text-gray-500 dark:text-slate-400 mt-3 text-sm">{description}</p>
            </div>

            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
                    <div className="relative w-full max-w-4xl">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute -top-12 right-0 text-white hover:text-red-500 font-black tracking-widest text-m uppercase"
                        >
                            TUTUP [X]
                        </button>

                        <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                            <iframe
                                className="w-full h-full"
                                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
