import React from 'react';
import { Head } from '@inertiajs/react';
import MultimediaLayout from '@/Layouts/MultimediaLayout';

export default function ArkibDigital() {
    return (
        <MultimediaLayout>
            <Head title="Karya Kreatif - SELANGOR INTERACTIVE MEDIA" />
            <div className="space-y-8">
                <header className="border-b border-slate-200 dark:border-slate-800 pb-8">
                    <h1 className="text-4xl font-black tracking-tight dark:text-white">
                        Arkib <span className="text-red-600">Digital</span>
                    </h1>
                    <p className="mt-4 text-slate-500 dark:text-slate-400 max-w-2xl">
                        Sini tempat arkib punya
                    </p>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="h-64 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 font-bold tracking-widest text-sm uppercase">
                        Arkib 1
                    </div>
                    <div className="h-64 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 font-bold tracking-widest text-sm uppercase">
                        Arkib 2
                    </div>
                    <div className="h-64 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 font-bold tracking-widest text-sm uppercase">
                        Arkib 3
                    </div>
                </div>
            </div>
        </MultimediaLayout>
    );
}
