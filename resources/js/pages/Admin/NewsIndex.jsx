import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function NewsIndex({ auth, initialNews = [] }) {
    const [newsItems] = useState(initialNews.length ? initialNews : [
        { news_id: 1, admin_id: 1, admin_name: 'Admin', headline: 'Selangor Budget 2026 Announced', content: 'Full details of the budget...', is_featured: 1, publish_date: '2026-05-11', resource: 'Internal' },
        { news_id: 2, admin_id: 1, admin_name: 'Admin', headline: 'Flood Mitigation Project Update', content: 'Phase 3 has commenced...', is_featured: 0, publish_date: '2026-05-09', resource: 'Press Release' }
    ]);

    return (
        <AdminLayout auth={auth}>
            <Head title="News Management - SIM Workspace" />

            <div className="max-w-7xl mx-auto space-y-6">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">News Management</h1>
                    <Link href="/admin/news/create" className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-red-500/20 transition-all">
                        + Create News
                    </Link>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-xs uppercase font-semibold">
                                <th className="p-4 pl-6">Headline</th>
                                <th className="p-4">Resource</th>
                                <th className="p-4">Featured</th>
                                <th className="p-4">Publish Date</th>
                                <th className="p-4 pr-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-sm">
                            {newsItems.map((news) => (
                                <tr key={news.news_id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                    <td className="p-4 pl-6">
                                        <p className="font-bold text-slate-800 dark:text-slate-100 line-clamp-1">{news.headline}</p>
                                        <p className="text-xs text-slate-400 mt-1">By Admin ID: {news.admin_id}</p>
                                    </td>
                                    <td className="p-4 text-slate-600 dark:text-slate-300">{news.resource}</td>
                                    <td className="p-4">
                                        {news.is_featured === 1 ? (
                                            <span className="bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 px-2.5 py-1 rounded-md text-xs font-bold">Featured</span>
                                        ) : (
                                            <span className="text-slate-400 dark:text-slate-500 text-xs font-medium">Standard</span>
                                        )}
                                    </td>
                                    <td className="p-4 text-slate-500 dark:text-slate-400">{news.publish_date}</td>
                                    <td className="p-4 pr-6 text-right">
                                        <Link href={`/admin/news/${news.news_id}/edit`} className="text-blue-600 dark:text-blue-400 hover:underline mr-4">Edit</Link>
                                        <button className="text-red-600 dark:text-red-400 hover:underline">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
