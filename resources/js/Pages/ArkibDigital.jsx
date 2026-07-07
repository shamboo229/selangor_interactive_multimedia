import React from 'react';
import { Head } from '@inertiajs/react';
import MultimediaLayout from '@/Layouts/MultimediaLayout';
import ArchiveGrid from '@/Components/ArchiveGrid';

export default function ArkibDigital({ archiveVideos }) {
    const videos = archiveVideos || [];

    return (
        <MultimediaLayout>
            <Head title="Arkib Digital - SELANGOR INTERACTIVE MEDIA" />

            <div className="space-y-8">
                <header className="border-b border-slate-200 dark:border-slate-800 pb-8">
                    <h1 className="text-4xl font-black tracking-tight dark:text-white">
                        Arkib <span className="text-red-600">Digital</span>
                    </h1>
                    <p className="mt-4 text-slate-500 dark:text-slate-400 max-w-2xl">
                        Terokai koleksi penuh rakaman multimedia dan siaran rasmi. Klik mana-mana video untuk mula menonton.
                    </p>
                </header>

                <ArchiveGrid videos={videos} />
            </div>
        </MultimediaLayout>
    );
}
