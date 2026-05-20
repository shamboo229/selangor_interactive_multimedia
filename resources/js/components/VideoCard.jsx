import React, { useState, useEffect, useRef } from 'react';
import Hls from 'hls.js';

export default function VideoCard({ stream }) {
    const videoRef = useRef(null);
    const rawUrl = stream?.stream_url || stream?.id || "";
    const isHlsStream = rawUrl.toLowerCase().includes('.m3u8');
    const isYouTube = rawUrl.includes('youtube.com') || rawUrl.includes('youtu.be');

    const [finalUrl, setFinalUrl] = useState("");

    useEffect(() => {
        if (rawUrl) {
            const timestampedUrl = rawUrl;
            setFinalUrl(timestampedUrl);
        }
    }, [rawUrl, isHlsStream]);

    useEffect(() => {
        if (!finalUrl || !isHlsStream || !videoRef.current) return;

        let hls;

        if (Hls.isSupported()) {
            console.log("Initializing raw HLS.js...");
            hls = new Hls({
                debug: true,
                enableWorker: true,
                lowLatencyMode: true,
            });

            hls.loadSource(finalUrl);
            hls.attachMedia(videoRef.current);

            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                console.log("Playlist parsed successfully! Attempting to play...");
                videoRef.current.play().catch(e => console.error("Autoplay blocked:", e));
            });

            hls.on(Hls.Events.ERROR, (event, data) => {
                if (data.fatal) {
                    console.error("FATAL HLS ERROR:", data);
                    switch (data.type) {
                        case Hls.ErrorTypes.NETWORK_ERROR:
                            console.error("Cannot download the video chunks (.ts files).");
                            hls.startLoad();
                            break;
                        case Hls.ErrorTypes.MEDIA_ERROR:
                            console.error("Video format is wrong (Check OBS Encoder).");
                            hls.recoverMediaError();
                            break;
                        default:
                            hls.destroy();
                            break;
                    }
                }
            });
        } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
            videoRef.current.src = finalUrl;
        }

        return () => {
            if (hls) hls.destroy();
        };
    }, [finalUrl, isHlsStream]);

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

                            {finalUrl && isHlsStream && (
                                <video
                                    ref={videoRef}
                                    controls
                                    muted
                                    autoPlay
                                    playsInline
                                    className="w-full h-full absolute top-0 left-0 object-contain"
                                />
                            )}

                            {finalUrl && isYouTube && (
                                <div className="flex items-center justify-center h-full text-white">
                                    [YouTube Player Goes Here]
                                </div>
                            )}

                            {!finalUrl && (
                                <div className="flex items-center justify-center h-full text-white">
                                    Memuatkan pemain...
                                </div>
                            )}

                        </div>
                    </div>
                    <div className="lg:col-span-3 flex flex-col gap-4">
                        <span className="text-red-600 font-black text-[9px] uppercase tracking-[0.2em] bg-red-50 px-3 py-1 rounded-full w-fit">
                            {stream.category || 'LIVE'}
                        </span>
                        <h1 className="text-2xl font-black text-slate-900 uppercase leading-tight">
                            {stream.title || 'STREAMING'}
                        </h1>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            {stream.description || 'Tiada deskripsi tersedia.'}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
