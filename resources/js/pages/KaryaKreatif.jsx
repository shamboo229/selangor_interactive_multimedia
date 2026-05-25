import React from 'react';
import { Head } from '@inertiajs/react';
import MultimediaLayout from '@/Layouts/MultimediaLayout';
import AssetGrid from '@/Components/AssetsGrid';

export default function KaryaKreatif({ assets }) {
    const demoAssets = [
        { asset_id: 1, category: 'Artworks', views: 3420, file_path: 'demo-art.jpg' },
        { asset_id: 2, category: 'Posters', views: 1205, file_path: 'demo-poster.jpg' },
        { asset_id: 3, category: 'Videos', views: 8900, file_path: 'demo-video.mp4' },
        { asset_id: 4, category: 'Animations', views: 450, file_path: 'demo-anim.mp4' },
        { asset_id: 5, category: 'Artworks', views: 2100, file_path: 'demo-art-2.jpg' }
    ];

    const displayAssets = assets && assets.length > 0 ? assets : demoAssets;

    return (
        <MultimediaLayout>
            <Head title="Karya Kreatif - SELANGOR INTERACTIVE MEDIA" />

            <div className="space-y-8">
                <header className="border-b border-slate-200 dark:border-slate-800 pb-8">
                    <h1 className="text-4xl font-black tracking-tight dark:text-white">
                        Karya <span className="text-blue-600">Kreatif</span>
                    </h1>
                    <p className="mt-4 text-slate-500 dark:text-slate-400 max-w-2xl">
                        Muat turun pelbagai kandungan digital percuma termasuk poster, animasi, video dan karya seni rasmi.
                    </p>
                </header>

                <AssetGrid assets={displayAssets} />
            </div>
        </MultimediaLayout>
    );
}
