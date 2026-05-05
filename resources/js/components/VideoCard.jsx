import React, { useState, useEffect } from 'react';

export default function VideoCard({ videoId }) {
    const [stream, setStream] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        fetch(`http://127.0.0.1:8000/api/streams/${videoId}`)
            .then(res => {
                if (!res.ok) throw new Error('Data stream tidak dijumpai');
                return res.json();
            })
            .then(data => {
                if (isMounted) {
                    const streamData = Array.isArray(data) ? data[0] : data;
                    setStream(streamData);
                    setLoading(false);
                }
            })
            .catch(err => {
                if (isMounted) {
                    setError(err.message);
                    setLoading(false);
                }
            });

        return () => { isMounted = false; };
    }, [videoId]);

    if (loading) return <div className="p-10 text-center text-slate-500 font-bold tracking-widest uppercase text-xs">Loading Live Stream...</div>;
    if (error) return <div className="p-10 text-center text-red-600 font-bold uppercase text-xs">Error: {error}</div>;

    // Ensure we only use the ID for the iframe embed URL
    const ytId = stream?.stream_url?.includes('youtube.com') || stream?.stream_url?.includes('youtu.be')
        ? stream.stream_url.split('v=')[1]?.split('&')[0] || stream.stream_url.split('/').pop()
        : stream?.stream_url;

    return (
        <section className="w-full py-8 px-4 md:px-10">
            <div className="w-full max-w-[1800px] mx-auto p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-xl bg-white dark:bg-slate-950">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    <div className="lg:col-span-9">
                        <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-lg">
                            {ytId ? (
                                <iframe
                                    className="absolute top-0 left-0 w-full h-full"
                                    // Added autoplay=1 and mute=1 so it autoplays silently
                                    src={`https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&rel=0&modestbranding=1`}
                                    title={stream.title || "YouTube video player"}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <div className="flex items-center justify-center w-full h-full text-white/50">
                                    Invalid Video ID
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="lg:col-span-3 flex flex-col gap-4">
                        <span className="text-red-600 font-black text-[9px] uppercase tracking-[0.2em] bg-red-50 dark:bg-red-950/30 px-3 py-1 rounded-full w-fit">
                            {stream.category || 'SIARAN LANGSUNG'}
                        </span>
                        <h1 className="text-2xl font-black text-slate-900 dark:text-white uppercase leading-tight">
                            {stream.title || 'No Title'}
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
