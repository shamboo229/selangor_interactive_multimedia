import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import MultimediaLayout from '@/Layouts/MultimediaLayout';
import AssetGrid from '@/Components/AssetsGrid';

export default function KaryaKreatif({ assets }) {
    const [showUploadForm, setShowUploadForm] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    // Inertia Form Setup for Public Submissions
    const { data, setData, post, processing, errors, progress, reset } = useForm({
        contributor_name: '',
        email: '',
        title: '',
        category: 'Artworks',
        file: null,
    });

    const demoAssets = [
        { asset_id: 1, category: 'Artworks', views: 3420, file_path: 'demo-art.jpg' },
        { asset_id: 2, category: 'Posters', views: 1205, file_path: 'demo-poster.jpg' },
        { asset_id: 3, category: 'Videos', views: 8900, file_path: 'demo-video.mp4' },
        { asset_id: 4, category: 'Animations', views: 450, file_path: 'demo-anim.mp4' },
        { asset_id: 5, category: 'Artworks', views: 2100, file_path: 'demo-art-2.jpg' }
    ];

    const displayAssets = assets && assets.length > 0 ? assets : demoAssets;

    const handleSubmit = (e) => {
        e.preventDefault();
        // Posts to a public endpoint that stores data securely in a pending table
        post('/karya-kreatif/submit', {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setShowUploadForm(false);
                setSuccessMessage('Karya anda berjaya dihantar dan sedang menunggu semakan admin! (Your work has been submitted and is pending review!)');
                setTimeout(() => setSuccessMessage(''), 8000);
            }
        });
    };

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
                        onClick={() => setShowUploadForm(!showUploadForm)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-sm font-bold shadow-lg shadow-blue-500/30 transition-all flex items-center gap-2 whitespace-nowrap"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {showUploadForm ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                            )}
                        </svg>
                        {showUploadForm ? 'Batal (Cancel)' : 'Sumbang Karya (Submit Work)'}
                    </button>
                </header>

                {/* Success Notification */}
                {successMessage && (
                    <div className="bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 px-6 py-4 rounded-2xl flex items-center gap-3">
                        <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <p className="text-sm font-semibold">{successMessage}</p>
                    </div>
                )}

                {/* Public Submission Form */}
                {showUploadForm && (
                    <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                        <div className="border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
                            <h3 className="text-lg font-bold text-slate-800 dark:text-white">Hantar Karya Anda</h3>
                            <p className="text-sm text-slate-500">All submissions are reviewed by our administrators before being published to the public gallery.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 mb-1">Nama Penuh / Contributor Name <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    required
                                    value={data.contributor_name}
                                    onChange={e => setData('contributor_name', e.target.value)}
                                    className="w-full px-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="John Doe"
                                />
                                {errors.contributor_name && <p className="text-red-500 text-xs mt-1">{errors.contributor_name}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-500 mb-1">Alamat E-mel / Email Address <span className="text-red-500">*</span></label>
                                <input
                                    type="email"
                                    required
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    className="w-full px-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="john@example.com"
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-500 mb-1">Tajuk Karya / Asset Title <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    required
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    className="w-full px-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="Seni Digital Merdeka"
                                />
                                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-500 mb-1">Kategori / Category <span className="text-red-500">*</span></label>
                                <select
                                    value={data.category}
                                    onChange={e => setData('category', e.target.value)}
                                    className="w-full px-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="Artworks">Artworks / Karya Seni</option>
                                    <option value="Posters">Posters / Poster</option>
                                    <option value="Videos">Videos / Video</option>
                                    <option value="Animations">Animations / Animasi</option>
                                    <option value="PDF">Document / PDF</option>
                                </select>
                                {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-xs font-semibold text-slate-500 mb-1">Fail / File Attachment <span className="text-red-500">*</span></label>
                                <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-4 text-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <input
                                        type="file"
                                        required
                                        accept="image/*,video/*,.pdf"
                                        onChange={e => setData('file', e.target.files[0])}
                                        className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                                    />
                                </div>
                                {errors.file && <p className="text-red-500 text-xs mt-1">{errors.file}</p>}
                            </div>
                        </div>

                        {/* Upload Progress Bar */}
                        {progress && (
                            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 mt-4">
                                <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" style={{ width: `${progress.percentage}%` }}></div>
                                <p className="text-xs text-slate-500 mt-1 text-right">{progress.percentage}% Uploaded</p>
                            </div>
                        )}

                        <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800 mt-6">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-slate-900 dark:bg-white dark:text-slate-900 text-white px-8 py-3 rounded-xl text-sm font-bold transition-all disabled:opacity-50 flex items-center gap-2"
                            >
                                {processing ? (
                                    <>
                                        <svg className="animate-spin h-4 w-4 text-white dark:text-slate-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                        Uploading...
                                    </>
                                ) : 'Hantar Semakan (Submit for Review)'}
                            </button>
                        </div>
                    </form>
                )}

                <AssetGrid assets={displayAssets} />
            </div>
        </MultimediaLayout>
    );
}
