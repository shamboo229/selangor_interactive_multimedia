import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

export default function VideoCard({ stream }) {
    const videoRef = useRef(null);

    // 1. Defensively extract the raw data
    const isString = typeof stream === 'string';
    let urlExtractor = isString ? stream : (stream?.stream_url || stream?.url || stream?.video_url || stream?.link || "");

    if (!urlExtractor && stream?.id) {
        urlExtractor = String(stream.id);
    }

    const rawUrl = urlExtractor?.trim() || "";
    const lowerUrl = rawUrl.toLowerCase();

    // 2. Identify HLS
    const isHlsStream = lowerUrl.includes('.m3u8');

    // 3. Extract exact YouTube ID (whether it's a full link or just the 11-char ID)
    let ytId = null;
    if (rawUrl.length === 11 && !rawUrl.includes('.')) {
        ytId = rawUrl;
    } else if (lowerUrl.includes('youtube.com') || lowerUrl.includes('youtu.be')) {
        const match = rawUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
        if (match && match[1]) ytId = match[1];
    }
    const isYouTube = !!ytId;

    // 4. HLS strictly uses useEffect. YouTube no longer needs it.
    useEffect(() => {
        if (!rawUrl || !isHlsStream || !videoRef.current) return;

        let hls;

        if (Hls.isSupported()) {
            hls = new Hls({
                enableWorker: true,
                lowLatencyMode: true,
            });

            hls.loadSource(rawUrl);
            hls.attachMedia(videoRef.current);

            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                videoRef.current.play().catch(e => console.error("Autoplay blocked:", e));
            });

            hls.on(Hls.Events.ERROR, (event, data) => {
                if (data.fatal) {
                    if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
                        hls.startLoad();
                    } else if (data.type === Hls.ErrorTypes.MEDIA_ERROR) {
                        hls.recoverMediaError();
                    } else {
                        hls.destroy();
                    }
                }
            });
        } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
            videoRef.current.src = rawUrl;
        }

        return () => {
            if (hls) hls.destroy();
        };
    }, [rawUrl, isHlsStream]);

    if (!stream || !rawUrl) {
        return (
            <div className="p-10 text-center text-red-600 font-bold uppercase text-xs">
                Data stream tidak dijumpai
            </div>
        );
    }

    return (
        <section className="w-full py-8 px-4 md:px-10">
            <div className="w-full max-w-[1800px] mx-auto p-6 rounded-[2rem] border border-slate-200 shadow-xl bg-white dark:bg-slate-950">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-9">
                        <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-lg">

                            {/* HLS Player (Archives) - Unchanged so it keeps working perfectly */}
                            {isHlsStream && (
                                <video
                                    ref={videoRef}
                                    controls
                                    muted
                                    autoPlay
                                    playsInline
                                    className="w-full h-full absolute top-0 left-0 object-contain"
                                />
                            )}

                            {/* NATIVE YOUTUBE IFRAME - Replaces ReactPlayer */}
                            {isYouTube && (
                                <iframe
                                    className="w-full h-full absolute top-0 left-0"
                                    src={`https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&playsinline=1`}
                                    title="YouTube Player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                ></iframe>
                            )}

                            {!isHlsStream && !isYouTube && (
                                <div className="flex items-center justify-center h-full text-white text-sm">
                                    Memuatkan pemain...
                                </div>
                            )}

                        </div>
                    </div>
                    <div className="lg:col-span-3 flex flex-col gap-4">
                        <span className="text-red-600 font-black text-[9px] uppercase tracking-[0.2em] bg-red-50 px-3 py-1 rounded-full w-fit">
                            {stream?.category || 'LIVE'}
                        </span>
                        <h1 className="text-2xl font-black text-slate-900 uppercase leading-tight">
                            {stream?.title || 'STREAMING'}
                        </h1>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            {stream?.description || 'Tiada deskripsi tersedia.'}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
