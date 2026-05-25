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
    $stream = Stream::where('is_active', true)->latest()->first();
    $latestNews = News::orderBy('publish_date', 'desc')->take(3)->get();

    // Fetch the 4 latest published assets
    $latestAssets = \App\Models\Asset::where('status', '!=', 'unpublished')
                                     ->latest()
                                     ->take(4)
                                     ->get();

    return Inertia::render('Home', [
        'featuredLive' => [
            'id'          => $stream->stream_url ?? null,
            'title'       => $stream->title ?? 'Tiada Siaran Aktif',
            'is_active'   => $stream ? true : false,
            'category'    => 'LIVE',
            'description' => 'Selamat datang ke portal multimedia Selangor',
        ],
        'archiveVideos' => Stream::where('is_active', false)->latest()->take(4)->get(),
        'latestNews'    => $latestNews,
        'latestAssets'  => $latestAssets, // Pass it to React here
    ]);
})->name('home');

Route::get('/berita', function () {
    $news = News::orderBy('publish_date', 'desc')->get();

    return Inertia::render('InfoSemasa', [
        'newsItems' => $news
    ]);
})->name('berita');

Route::get('/karya', function () {
    $assets = \App\Models\Asset::where('status', '!=', 'unpublished')->latest()->get();

    return Inertia::render('KaryaKreatif', [
        'assets' => $assets
    ]);
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
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [AdminController::class, 'Dashboard'])->name('dashboard');
    Route::post('/update-stream', [AdminController::class, 'updateStream'])->name('stream.update');
    Route::get('/news', [NewsController::class, 'index'])->name('news.index');
    Route::post('/news', [NewsController::class, 'store'])->name('news.store');
    Route::put('/news/{news}', [NewsController::class, 'update'])->name('news.update');
    Route::get('/assets', [AssetController::class, 'index'])->name('assets.index');
    Route::get('/assets/create', [AssetController::class, 'create'])->name('assets.create');
    Route::post('/assets', [AssetController::class, 'store'])->name('assets.store');
    Route::delete('/assets/{id}', [AssetController::class, 'destroy'])->name('assets.destroy');
});
});

require __DIR__.'/auth.php';
