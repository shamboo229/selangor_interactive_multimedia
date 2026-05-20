import React from 'react';
import { Head } from '@inertiajs/react';
import MultimediaLayout from '@/Layouts/MultimediaLayout';

export default function InfoSemasa() {
    return (
        <MultimediaLayout>
            <Head title="Info Seamsa - SELANGOR INTERACTIVE MEDIA" />
            <div className="space-y-8">
                <header className="border-b border-slate-200 dark:border-slate-800 pb-8">
                    <h1 className="text-4xl font-black tracking-tight dark:text-white">
                        Info <span className="text-red-600">Semasa</span>
                    </h1>
                    <p className="mt-4 text-slate-500 dark:text-slate-400 max-w-2xl">
                        sini ada berita boleh baca punya, kalau tak mau baca tkpala, takda paksa punya.
                    </p>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="h-64 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 font-bold tracking-widest text-sm uppercase">
                        Berita 1, ye ke
                    </div>
                    <div className="h-64 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 font-bold tracking-widest text-sm uppercase">
                        Berita 2, rasanya
                    </div>
                    <div className="h-64 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 font-bold tracking-widest text-sm uppercase">
                        Berita 3, kot 
                    </div>
                </div>
            </div>
        </MultimediaLayout>
    );
}
