import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function MediaLibrary({ auth, initialAssets = [] }) {
    const [assets] = useState(initialAssets.length ? initialAssets : [
        { asset_id: 1, cont_id: 1, category: 'Image', status: 'published', file_path: '/uploads/budget2026.png', views: 1245 },
        { asset_id: 2, cont_id: 2, category: 'PDF', status: 'unpublished', file_path: '/uploads/flood_report.pdf', views: 0 },
        { asset_id: 3, cont_id: 1, category: 'Video', status: 'published', file_path: '/uploads/speech.mp4', views: 8930 },
        { asset_id: 4, cont_id: 3, category: 'Image', status: 'published', file_path: '/uploads/thumbnail.jpg', views: 432 },
    ]);

    return (
        <AdminLayout auth={auth}>
            <Head title="Media Library - SIM Workspace" />

            <div className="max-w-7xl mx-auto space-y-6">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">Media & Assets</h1>
                    <button className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-red-500/20 transition-all">
                        Upload Asset
                    </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {assets.map((asset) => (
                        <div key={asset.asset_id} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden group">
                            <div className="aspect-square bg-slate-100 dark:bg-slate-900 relative">
                                <div className="absolute inset-0 flex items-center justify-center text-slate-300 dark:text-slate-600 group-hover:scale-105 transition-transform duration-300">
                                    {asset.category === 'Video' ? (
                                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    ) : asset.category === 'PDF' ? (
                                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                    ) : (
                                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                    )}
                                </div>
                                <div className="absolute top-3 left-3">
                                    <span className={`px-2 py-1 text-[10px] uppercase font-bold rounded-md shadow-sm ${asset.status === 'published' ? 'bg-emerald-500 text-white' : 'bg-slate-500 text-white'}`}>
                                        {asset.status}
                                    </span>
                                </div>
                            </div>

                            <div className="p-4 border-t border-slate-100 dark:border-slate-700">
                                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate" title={asset.file_path}>
                                    {asset.file_path.split('/').pop()}
                                </p>
                                <div className="flex justify-between items-center mt-2">
                                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded">
                                        {asset.category}
                                    </p>
                                    <p className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                                        {asset.views.toLocaleString()}
                                    </p>
                                </div>
                                <p className="text-[10px] text-slate-400 mt-2 truncate">Linked to Content ID: {asset.cont_id}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}
