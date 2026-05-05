import React, { useState, useEffect } from 'react';

export default function VideoCard({ videoId }) {
    const [stream, setStream] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/streams/${videoId}`)
            .then(res => {
                if (!res.ok) throw new Error('Data stream tidak dijumpai');
                return res.json();
            })
            .then(data => {
                setStream(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [videoId]);

    if (loading || error) return null;

    const ytId = stream.stream_url;

    return (
        <section className="w-full py-8 px-4 md:px-10">
            <div className="w-full max-w-[1800px] mx-auto p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-xl bg-white dark:bg-slate-950">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-9">
                        <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-lg">
                            {isPlaying ? (
                                <iframe
                                    className="w-full h-full"
                                    src={`https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1`}
                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <div className="w-full h-full relative cursor-pointer group" onClick={() => setIsPlaying(true)}>
                                    <img
                                        src={`https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`}
                                        className="w-full h-full object-cover"
                                        alt="Thumbnail"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                        <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 group-hover:scale-110 transition">
                                            <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-white border-b-[12px] border-b-transparent ml-1"></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="lg:col-span-3 flex flex-col gap-4">
                        <span className="text-red-600 font-black text-[9px] uppercase tracking-[0.2em] bg-red-50 dark:bg-red-950/30 px-3 py-1 rounded-full w-fit">
                            {stream.category || 'Siaran Langsung'}
                        </span>
                        <h1 className="text-2xl font-black text-slate-900 dark:text-white uppercase leading-tight tracking-tight">
                            {stream.title}
                        </h1>
                        <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed">
                            {stream.description || 'Tiada deskripsi tersedia.'}
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}
