<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AdminController;
use App\Models\Stream;
use App\Models\Video;

Route::get('/', function () {
    $stream = Stream::first();
    return Inertia::render('Home', [
        'featuredLive' => [
            'title'       => $stream->title ?? 'Tiada Siaran Aktif',
            'category'    => strtoupper($stream->provider ?? 'OFFLINE'),
            'description' => 'Selamat datang ke portal multimedia Selangor',
            'isLive'      => true,
            'videoId'     => $stream->stream_url ?? '',
        ],
        'archiveVideos' => [],
    ]);
})->name('Home');;


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/admin', [AdminController::class, 'Dashboard'])->name('admin.dashboard');

Route::post('/admin/update-stream', [AdminController::class, 'updateStream'])
    ->name('admin.stream.update');

require __DIR__.'/auth.php';
