<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\AssetController;
use App\Models\Stream;
use App\Models\News;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    // Fetch the active stream
    $stream = Stream::where('is_active', true)->latest()->first();

    // Fetch the latest 3 news items
    $latestNews = News::orderBy('publish_date', 'desc')->take(3)->get();

    return Inertia::render('Home', [
        'featuredLive' => [
            'id'          => $stream->stream_url ?? null,
            'title'       => $stream->title ?? 'Tiada Siaran Aktif',
            'is_active'   => $stream ? true : false,
            'category'    => 'LIVE',
            'description' => 'Selamat datang ke portal multimedia Selangor',
        ],
        'archiveVideos' => Stream::where('is_active', false)->latest()->get(),

        // Pass the news to your React component
        'latestNews'    => $latestNews,
    ]);
})->name('home');

Route::get('/berita', function () {
    $news = \App\Models\News::orderBy('publish_date', 'desc')->get();

    return Inertia::render('InfoSemasa', [
        'newsItems' => $news
    ]);
})->name('berita');

Route::get('/karya', function () {
    return Inertia::render('KaryaKreatif');
})->name('karya');

Route::get('/arkib', function () {
    return Inertia::render('ArkibDigital', [
        'archiveVideos' => Stream::where('is_active', false)->latest()->get(),
    ]);
})->name('arkib');

Route::get('/login', [AuthenticatedSessionController::class, 'create'])->name('login');
Route::post('/login', [AuthenticatedSessionController::class, 'store']);

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->name('logout');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/admin', [AdminController::class, 'Dashboard'])->name('dashboard');
    Route::get('/admin/news', [NewsController::class, 'index'])->name('admin.news.index');
    Route::post('/admin/news', [NewsController::class, 'store'])->name('admin.news.store');
    Route::put('/admin/news/{news}', [NewsController::class, 'update'])->name('admin.news.update');
    Route::get('/admin/assets', [AssetController::class, 'index'])->name('admin.assets.index');
    Route::post('/admin/update-stream', [AdminController::class, 'updateStream'])
        ->name('admin.stream.update');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
