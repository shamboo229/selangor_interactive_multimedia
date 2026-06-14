import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import MultimediaLayout from '@/Layouts/MultimediaLayout';
import AssetGrid from '@/Components/AssetsGrid';

export default function KaryaKreatif({ assets }) {
    const [showInstructions, setShowInstructions] = useState(false);
    const displayAssets = assets;

    return (
        <MultimediaLayout>
            <Head title="Karya Kreatif - SELANGOR INTERACTIVE MEDIA" />

            <div className="space-y-8">
                <header className="border-b border-slate-200 dark:border-slate-800 pb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-4xl font-black tracking-tight dark:text-white">
                            Karya <span className="text-blue-600">Kreatif</span>
                        </h1>
                        <p className="mt-4 text-slate-500 dark:text-slate-400 max-w-2xl">
                            Muat turun pelbagai kandungan digital percuma termasuk poster, animasi, video dan karya seni rasmi.
                        </p>
                    </div>

                    <button
                        onClick={() => setShowInstructions(!showInstructions)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-sm font-bold shadow-lg shadow-blue-500/30 transition-all flex items-center gap-2 whitespace-nowrap"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {showInstructions ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                            )}
                        </svg>
                        {showInstructions ? 'Tutup (Close)' : 'Sumbang Karya (Submit Work)'}
                    </button>
                </header>

                {showInstructions && (
                    <div className="bg-blue-50/50 dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-blue-100 dark:border-slate-800 shadow-sm space-y-6">
                        <div className="border-b border-blue-100 dark:border-slate-800 pb-4 mb-4 flex items-center gap-4">
                            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full text-blue-600 dark:text-blue-400">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path>
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-800 dark:text-white">Cara Menghantar Karya</h3>
                                <p className="text-sm text-slate-500">How to submit your digital artwork</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div className="space-y-4">
                                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                                    Berminat untuk mempamerkan karya seni digital anda di galeri kami? Sila hantarkan karya anda melalui e-mel kepada pihak pentadbir kami.
                                </p>

                                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 inline-block w-full">
                                    <p className="text-xs text-slate-400 font-semibold mb-1">Hantar e-mel ke / Send email to:</p>
                                    <a href="mailto:submissions@selangor.gov.my" className="text-lg font-black text-blue-600 dark:text-blue-400 hover:underline">
                                        submissions@selangor.gov.my
                                    </a>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-700">
                                <p className="text-sm font-bold text-slate-800 dark:text-white mb-3">Sila sertakan butiran berikut dalam e-mel anda:</p>
                                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-500 mt-0.5">•</span>
                                        <span><strong>Nama Penuh</strong> (Sama ada nama anda atau nama organisasi)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-500 mt-0.5">•</span>
                                        <span><strong>Tajuk Karya</strong> (Contoh: Seni Digital Merdeka)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-500 mt-0.5">•</span>
                                        <span><strong>Kategori</strong> (Artworks, Posters, Videos, atau Animations)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-500 mt-0.5">•</span>
                                        <span><strong>Fail Karya</strong> (Lampirkan fail dalam bentuk JPG, PNG, PDF, atau MP4)</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <p className="text-xs text-center text-slate-400 pt-4 italic">
                            *Semua karya yang dihantar akan disemak terlebih dahulu. Pentadbir berhak untuk menolak karya yang tidak bersesuaian.
                        </p>
                    </div>
                )}

                <AssetGrid assets={displayAssets} />
            </div>
        </MultimediaLayout>
    );
}
