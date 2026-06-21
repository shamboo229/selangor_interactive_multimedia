import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function StreamsIndex({ auth, streams = [] }) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleDelete = (id) => {
        if (confirm('Adakah anda pasti untuk memadam arkib ini?')) {
            router.delete(route('admin.streams.destroy', id), {
                preserveScroll: true,
            });
        }
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
                                    <th className="px-6 py-4 font-semibold">Stream URL</th>
                                    <th className="px-6 py-4 font-semibold">Status</th>
                                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredStreams.length > 0 ? (
                                    filteredStreams.map((stream) => (
                                        <tr key={stream.id} className="hover:bg-slate-50/50 transition-colors">
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
                                                    className="font-medium text-blue-600 hover:text-blue-800 transition-colors"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(stream.id)}
                                                    className="font-medium text-red-600 hover:text-red-800 transition-colors"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
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
        </AdminLayout>
    );
}
