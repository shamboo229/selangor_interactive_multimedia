import React, { useState } from 'react';

export default function NewsGrid({ newsItems = [] }) {
    const [selectedNews, setSelectedNews] = useState(null);

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {newsItems.length > 0 ? (
                    newsItems.map((news) => (
                        <div
                            key={news.news_id}
                            onClick={() => setSelectedNews(news)}
                            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer group"
                        >
                            {news.image_path ? (
                                <div className="overflow-hidden h-48">
                                    <img
                                        src={`/storage/${news.image_path}`}
                                        alt={news.headline}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                            ) : (
                                <div className="w-full h-48 bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 text-xs font-bold uppercase tracking-widest group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-colors duration-300">
                                    Tiada Gambar
                                </div>
                            )}
                            <div className="p-5 flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider">
                                        {news.resource}
                                    </span>
                                    <span className="text-xs text-slate-400">
                                        {news.publish_date}
                                    </span>
                                </div>
                                <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-2 line-clamp-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                                    {news.headline}
                                </h2>
                                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 flex-1">
                                    {news.content}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full h-64 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 font-bold tracking-widest text-sm uppercase">
                        Tiada Berita Setakat Ini
                    </div>
                )}
            </div>

            {/* Modal Popup */}
            {selectedNews && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200"
                    onClick={() => setSelectedNews(null)}
                >
                    <div
                        className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300 relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="absolute top-4 right-4 z-10">
                            <button
                                onClick={() => setSelectedNews(null)}
                                className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-md transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="overflow-y-auto w-full">
                            {selectedNews.image_path && (
                                <img
                                    src={`/storage/${selectedNews.image_path}`}
                                    alt={selectedNews.headline}
                                    className="w-full h-64 sm:h-96 object-cover"
                                />
                            )}

                            <div className="p-6 sm:p-10 space-y-6">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-bold uppercase tracking-wider rounded-full">
                                            {selectedNews.resource}
                                        </span>
                                        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                            {selectedNews.publish_date}
                                        </span>
                                    </div>
                                    <h2 className="text-2xl sm:text-4xl font-black text-slate-800 dark:text-white leading-tight">
                                        {selectedNews.headline}
                                    </h2>
                                </div>

                                <div className="w-12 h-1 bg-red-600 rounded-full"></div>

                                <div className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap text-base sm:text-lg">
                                    {selectedNews.content}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
