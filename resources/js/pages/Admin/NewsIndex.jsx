import React, { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function NewsIndex({ auth, initialNews = [] }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingNews, setEditingNews] = useState(null);

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        _method: 'POST',
        headline: '',
        content: '',
        is_featured: 0,
        publish_date: '',
        resource: '',
        image: null,
    });

    const handleDelete = (newsId) => {
        if (window.confirm('Are you sure you want to delete this news article? This action cannot be undone.')) {
            router.delete(`/admin/news/${newsId}`, {
                preserveScroll: true,
            });
        }
    };

    const openCreateModal = () => {
        setEditingNews(null);
        clearErrors();
        setData({
            _method: 'POST',
            headline: '',
            content: '',
            is_featured: 0,
            publish_date: '',
            resource: '',
            image: null,
        });
        setIsModalOpen(true);
    };

    const openEditModal = (news) => {
        setEditingNews(news);
        clearErrors();
        setData({
            _method: 'PUT',
            headline: news.headline,
            content: news.content,
            is_featured: news.is_featured,
            publish_date: news.publish_date,
            resource: news.resource,
            image: null,
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingNews(null);
        reset();
        clearErrors();
    };

    const submitNews = (e) => {
        e.preventDefault();

        if (editingNews) {
            post(`/admin/news/${editingNews.news_id}`, {
                preserveScroll: true,
                onSuccess: () => closeModal(),
            });
        } else {
            post('/admin/news', {
                preserveScroll: true,
                onSuccess: () => closeModal(),
            });
        }
    };

    return (
        <AdminLayout auth={auth}>
            <Head title="News Management - SIM Workspace" />

            <div className="max-w-7xl mx-auto space-y-6">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">News Management</h1>
                    <button
                        onClick={openCreateModal}
                        className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-red-500/20 transition-all"
                    >
                        + Create News
                    </button>
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
                            {initialNews.length > 0 ? (
                                initialNews.map((news) => (
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
                                            <button
                                                onClick={() => openEditModal(news)}
                                                className="text-blue-600 dark:text-blue-400 hover:underline mr-4"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(news.news_id)}
                                                className="text-red-600 dark:text-red-400 hover:underline"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-slate-500">
                                        No news articles found. Click "Create News" to add one.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300">

                        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center shrink-0">
                            <h2 className="text-lg font-black text-slate-800 dark:text-white">
                                {editingNews ? 'Edit Article' : 'Publish New Article'}
                            </h2>
                            <button onClick={closeModal} className="text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 p-2 rounded-full transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto">
                            <form onSubmit={submitNews} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Headline</label>
                                    <input
                                        type="text"
                                        value={data.headline}
                                        onChange={e => setData('headline', e.target.value)}
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm focus:ring-2 focus:ring-red-500 outline-none dark:text-white"
                                        placeholder="Enter news headline..."
                                        required
                                    />
                                    {errors.headline && <div className="text-red-500 text-xs mt-1">{errors.headline}</div>}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Resource</label>
                                        <input
                                            type="text"
                                            value={data.resource}
                                            onChange={e => setData('resource', e.target.value)}
                                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm focus:ring-2 focus:ring-red-500 outline-none dark:text-white"
                                            placeholder="e.g., Press Release, Internal"
                                            required
                                        />
                                        {errors.resource && <div className="text-red-500 text-xs mt-1">{errors.resource}</div>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Publish Date</label>
                                        <input
                                            type="date"
                                            value={data.publish_date}
                                            onChange={e => setData('publish_date', e.target.value)}
                                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm focus:ring-2 focus:ring-red-500 outline-none dark:text-white"
                                            required
                                        />
                                        {errors.publish_date && <div className="text-red-500 text-xs mt-1">{errors.publish_date}</div>}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Content</label>
                                    <textarea
                                        value={data.content}
                                        onChange={e => setData('content', e.target.value)}
                                        rows="5"
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm focus:ring-2 focus:ring-red-500 outline-none dark:text-white resize-none"
                                        placeholder="Write the article content..."
                                        required
                                    ></textarea>
                                    {errors.content && <div className="text-red-500 text-xs mt-1">{errors.content}</div>}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Cover Image</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={e => setData('image', e.target.files[0])}
                                        className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                                    />
                                    {errors.image && <div className="text-red-500 text-xs mt-1">{errors.image}</div>}
                                </div>

                                <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                                    <input
                                        type="checkbox"
                                        id="is_featured"
                                        checked={data.is_featured === 1}
                                        onChange={e => setData('is_featured', e.target.checked ? 1 : 0)}
                                        className="w-5 h-5 text-red-600 bg-white border-slate-300 rounded focus:ring-red-500"
                                    />
                                    <label htmlFor="is_featured" className="text-sm font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                                        Highlight as Featured Article
                                    </label>
                                </div>

                                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 rounded-xl transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-red-600 hover:bg-red-700 disabled:bg-slate-400 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-red-500/20 transition-all"
                                    >
                                        {processing ? 'Saving...' : (editingNews ? 'Save Changes' : 'Publish Article')}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
