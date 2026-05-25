import React from 'react';
import { Head } from '@inertiajs/react';
import MultimediaLayout from '@/Layouts/MultimediaLayout';
import NewsGrid from '@/Components/NewsGrid';

export default function InfoSemasa({ newsItems = [] }) {
    return (
        <MultimediaLayout>
            <Head title="Info Semasa - SELANGOR INTERACTIVE MEDIA" />

            <div className="space-y-8">
                <header className="border-b border-slate-200 dark:border-slate-800 pb-8">
                    <h1 className="text-4xl font-black tracking-tight dark:text-white">
                        Info <span className="text-red-600">Semasa</span>
                    </h1>
                    <p className="mt-4 text-slate-500 dark:text-slate-400 max-w-2xl">
                        sini ada berita boleh baca punya, kalau tak mau baca tkpala, takda paksa punya.
                    </p>
                </header>
                <NewsGrid newsItems={newsItems} />
            </div>
        </MultimediaLayout>
    );
}
