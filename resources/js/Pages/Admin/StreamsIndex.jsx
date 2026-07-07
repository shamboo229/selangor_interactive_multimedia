import React, { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function StreamsIndex({ auth, streams = [] }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [editingStream, setEditingStream] = useState(null);

    const currentActiveStream = streams.find(s => s.is_active == 1 || s.is_active === true);

    const { data, setData, put, processing, errors, reset, clearErrors } = useForm({
        title: '',
        stream_url: '',
        description: '',
        is_active: false,
    });

    const handleEdit = (stream) => {
        setEditingStream(stream);
        setData({
            title: stream.title || '',
            stream_url: stream.stream_url || stream.url || '',
            description: stream.description || '',
            is_active: stream.is_active == 1 || stream.is_active === true,
        });
        clearErrors();
    };

    const closeEditModal = () => {
        setEditingStream(null);
        reset();
        clearErrors();
    };

    const handleUpdate = (e) => {
        e.preventDefault();

        const streamId = editingStream.id || editingStream.stream_id || editingStream.id_stream;

        if (data.is_active && currentActiveStream && currentActiveStream.id !== streamId) {
            const confirmOverride = confirm(
                `Amaran: Aliran "${currentActiveStream.title}" sedang aktif sekarang. Adakah anda pasti untuk menukarnya kepada aliran baru ini?`
            );
            if (!confirmOverride) return;
        }

        const updateUrl = typeof route !== 'undefined'
            ? route('admin.streams.update', streamId)
            : `/admin/streams/${streamId}`;

        put(updateUrl, {
            preserveScroll: true,
            onSuccess: () => closeEditModal(),
        });
    };

    const handleDelete = (id) => {
        try {
            if (!id) {
                alert('Error: Stream ID is missing. Cannot perform delete action.');
                return;
            }
            if (confirm('Adakah anda pasti untuk memadam arkib ini?')) {
                const deleteUrl = typeof route !== 'undefined'
                    ? route('admin.streams.destroy', id)
                    : `/admin/streams/${id}`;

                router.delete(deleteUrl, {
                    preserveScroll: true,
                });
            }
        } catch (error) {
            alert('Delete action failed: ' + error.message);
        }
    };

    const handleUrlChange = (e) => {
        let input = e.target.value.trim();

        if (input.includes('youtube.com') || input.includes('youtu.be')) {
            const match = input.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/|live\/))([\w-]{11})/);
            if (match && match[1]) {
                setData('stream_url', match[1]);
                return;
            }
        }
        setData('stream_url', input);
    };

    const filteredStreams = streams.filter((stream) => {
        const query = searchQuery.toLowerCase();
        const title = stream.title?.toLowerCase() || '';
        const description = stream.description?.toLowerCase() || '';
        const url = (stream.stream_url || stream.url || '').toLowerCase();

        return title.includes(query) || description.includes(query) || url.includes(query);
    });

    return (
        <AdminLayout auth={auth}>
            <Head title="Stream Archives - SIM Workspace" />

            <div className="max-w-7xl mx-auto space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Stream Archives</h1>
                        <p className="text-sm text-slate-500 mt-1">Manage your recorded broadcasts and past streams</p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                        <div className="relative w-full sm:w-72 shrink-0">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Search archives..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all text-slate-800 placeholder-slate-400"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                                >
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-slate-600">
                            <thead className="text-xs text-slate-500 uppercase bg-slate-50/80 border-b border-slate-100">
                                <tr>
                                    <th className="px-6 py-4 font-semibold">Title & Details</th>
                                    <th className="px-6 py-4 font-semibold">Stream URL / ID</th>
                                    <th className="px-6 py-4 font-semibold">Status</th>
                                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredStreams.length > 0 ? (
                                    filteredStreams.map((stream) => {
                                        const streamId = stream.id || stream.stream_id || stream.id_stream;
                                        return (
                                            <tr key={streamId} className="hover:bg-slate-50/50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="font-bold text-slate-800 text-base">{stream.title}</div>
                                                    <div className="text-slate-500 text-xs mt-1 truncate max-w-xs">{stream.description}</div>
                                                </td>
                                                <td className="px-6 py-4 font-mono text-xs text-slate-500">
                                                    <div className="truncate max-w-[200px]" title={stream.stream_url || stream.url}>
                                                        {stream.stream_url || stream.url || '-'}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                                        stream.is_active
                                                            ? 'bg-red-50 text-red-600'
                                                            : 'bg-slate-100 text-slate-600'
                                                    }`}>
                                                        {stream.is_active ? 'Live' : 'Archived'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right space-x-3">
                                                    <button
                                                        onClick={() => handleEdit(stream)}
                                                        className="font-medium text-blue-600 hover:text-blue-800 transition-colors"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(streamId)}
                                                        className="font-medium text-red-600 hover:text-red-800 transition-colors"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-12 text-center text-slate-500">
                                            {streams.length === 0
                                                ? "No stream archives found."
                                                : "No archives match your search criteria."}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {editingStream && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-slate-800">Edit Archive</h2>
                            <button onClick={closeEditModal} className="text-slate-400 hover:text-slate-600">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto">
                            <form id="edit-form" onSubmit={handleUpdate} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                                    <input
                                        type="text"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                    {errors.title && <div className="text-red-500 text-xs mt-1">{errors.title}</div>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Stream URL or ID</label>
                                    <input
                                        type="text"
                                        value={data.stream_url}
                                        onChange={handleUrlChange}
                                        placeholder="e.g. dQw4w9WgXcQ or YouTube link"
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                    {errors.stream_url && <div className="text-red-500 text-xs mt-1">{errors.stream_url}</div>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                                    <textarea
                                        rows="3"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    ></textarea>
                                    {errors.description && <div className="text-red-500 text-xs mt-1">{errors.description}</div>}
                                </div>

                                <div className="flex flex-col gap-1 pt-2">
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            id="is_active"
                                            checked={data.is_active}
                                            onChange={(e) => setData('is_active', e.target.checked)}
                                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                        />
                                        <label htmlFor="is_active" className="text-sm text-slate-700 cursor-pointer font-medium">
                                            Set as Active Live Stream
                                        </label>
                                    </div>
                                    {data.is_active && currentActiveStream && currentActiveStream.id !== (editingStream.id || editingStream.stream_id || editingStream.id_stream) && (
                                        <p className="text-amber-600 text-xs pl-6 font-semibold">
                                            Nota: Menyimpan akan menukar status "${currentActiveStream.title}" kepada Arkib secara automatik.
                                        </p>
                                    )}
                                </div>
                            </form>
                        </div>

                        <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={closeEditModal}
                                className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 bg-slate-100 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                form="edit-form"
                                disabled={processing}
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50"
                            >
                                {processing ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
