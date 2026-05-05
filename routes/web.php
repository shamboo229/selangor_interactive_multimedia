<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Models\Stream;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $stream = Stream::where('is_active', true)->first();

    return Inertia::render('Home', [
        'featuredLive' => [
            'title'       => $stream->title ?? 'Tiada Siaran Aktif',
            'category'    => 'LIVE',
            'description' => 'Selamat datang ke portal multimedia Selangor',
            'isLive'      => (bool)$stream,
            'videoId'     => $stream->stream_url ?? '',
        ],
        'archiveVideos' => Stream::where('is_active', false)->latest()->get(),
    ]);
})->name('home');

Route::get('/login', [AuthenticatedSessionController::class, 'create'])->name('login');
Route::post('/login', [AuthenticatedSessionController::class, 'store']);

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->name('logout');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/admin', [AdminController::class, 'Dashboard'])->name('dashboard');

    Route::post('/admin/update-stream', [AdminController::class, 'updateStream'])
        ->name('admin.stream.update');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
