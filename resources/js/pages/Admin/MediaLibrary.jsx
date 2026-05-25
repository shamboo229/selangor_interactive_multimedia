import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function MediaLibrary({ auth, assets = [] }) {
    // Handle Delete Action
    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this asset? This cannot be undone.')) {
            router.delete(`/admin/assets/${id}`);
        }
    };

    return (
        <AdminLayout auth={auth}>
            <Head title="Media Library - SIM Workspace" />

            <div className="max-w-7xl mx-auto space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">Karya Kreatif & Media</h1>
                        <p className="text-sm text-slate-500 mt-1">Manage downloadable assets, artworks, and videos.</p>
                    </div>
                    <Link
                        href="/admin/assets/create"
                        className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-red-500/20 transition-all flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                        Upload Asset
                    </Link>
                </div>

                {assets.length === 0 ? (
                    <div className="text-center py-24 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 border-dashed">
                        <svg className="w-16 h-16 mx-auto text-slate-300 dark:text-slate-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300">No media found</h3>
                        <p className="text-slate-500 text-sm mt-1 mb-6">Upload your first image, video, or document.</p>
                        <Link href="/admin/assets/create" className="text-red-600 font-bold hover:underline text-sm">Upload now &rarr;</Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {assets.map((asset) => (
                            <div key={asset.asset_id} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden group hover:shadow-md transition-shadow">
                                <div className="aspect-square bg-slate-100 dark:bg-slate-900 relative">
                                    <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity z-20 flex items-center justify-center gap-3 backdrop-blur-sm">
                                        <Link href={`/admin/assets/${asset.asset_id}/edit`} className="p-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors shadow-lg">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                                        </Link>
                                        <button onClick={() => handleDelete(asset.asset_id)} className="p-2 bg-white text-red-600 rounded-lg hover:bg-red-50 transition-colors shadow-lg">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                        </button>
                                    </div>

                                    {/* Visual Representation of Asset */}
                                    <div className="absolute inset-0 flex items-center justify-center text-slate-300 dark:text-slate-600 z-10">
                                        {(asset.category.toLowerCase() === 'video' || asset.category.toLowerCase() === 'videos' || asset.category.toLowerCase() === 'animations') ? (
                                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        ) : asset.category.toLowerCase() === 'pdf' ? (
                                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                        ) : (
                                            <img src={`/storage/${asset.file_path}`} alt="Thumbnail" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
                                        )}
                                    </div>

                                    <div className="absolute top-3 left-3 z-20">
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
                                    {asset.cont_id && (
                                        <p className="text-[10px] text-slate-400 mt-2 truncate">Linked ID: {asset.cont_id}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
