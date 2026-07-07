import React, { useState } from 'react';

export default function AssetGrid({ assets = [] }) {
    const [activeCategory, setActiveCategory] = useState('Semua');

    const categories = ['Semua', ...new Set(assets.map(asset => asset.category))];

    const filteredAssets = activeCategory === 'Semua'
        ? assets
        : assets.filter(asset => asset.category === activeCategory);

    return (
        <div className="space-y-8">
            <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`px-5 py-2 rounded-full text-xs uppercase tracking-widest font-black transition-all ${activeCategory === category ? 'bg-blue-600 text-white shadow-md transform scale-105' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-blue-300 dark:hover:border-blue-800'}`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredAssets.map((asset) => (
                    <div key={asset.asset_id} className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
                        <div className="aspect-square bg-slate-100 dark:bg-slate-800 relative overflow-hidden flex items-center justify-center p-4">
                            {(asset.category.toLowerCase() === 'videos' || asset.category.toLowerCase() === 'animations') && (
                                <div className="absolute inset-0 bg-slate-900/20 z-10 flex items-center justify-center">
                                    <div className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                                        <svg className="w-6 h-6 text-blue-600 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                                    </div>
                                </div>
                            )}
                            <img
                                src={`/storage/${asset.file_path}`}
                                alt={`Karya ${asset.asset_id}`}
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop';
                                }}
                            />
                        </div>

                        <div className="p-5 flex flex-col flex-grow">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 px-2.5 py-1 rounded-lg">
                                    {asset.category}
                                </span>
                                <div className="flex items-center gap-1.5 text-slate-400">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    <span className="text-xs font-bold">{asset.views}</span>
                                </div>
                            </div>

                            <a
                                href={`/storage/${asset.file_path}`}
                                download
                                className="mt-auto flex items-center justify-center gap-2 w-full text-center bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-3 rounded-xl font-bold text-sm hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white transition-colors group/btn"
                            >
                                <svg className="w-4 h-4 group-hover/btn:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                Muat Turun
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            {filteredAssets.length === 0 && (
                <div className="text-center py-24 bg-slate-100 dark:bg-slate-900/50 rounded-3xl border border-slate-200 dark:border-slate-800">
                    <span className="text-5xl">🎨</span>
                    <p className="mt-5 text-slate-500 dark:text-slate-400 font-bold text-lg">Tiada karya kreatif ditemui untuk kategori ini.</p>
                </div>
            )}
        </div>
    );
}
