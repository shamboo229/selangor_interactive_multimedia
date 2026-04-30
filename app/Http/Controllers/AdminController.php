<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Stream;

class AdminController extends Controller
{
    public function Dashboard()
    {
        $stream = Stream::first();

        return Inertia::render('Admin/Dashboard', [
            'currentStream' => [
                'title' => $stream->title ?? 'Sila Kemaskini Tajuk',
                'url'   => $stream->stream_url ?? '',
            ],
            'pendingWorks' => [
                ['stream_id' => 1, 'title' => 'Dokumentasi Hulu Langat', 'type' => 'Video', 'creator' => 'Unit Media'],
            ],
            'stats' => [
                'active_users' => 1250,
                'total_views' => 45800,
            ]
        ]);
    }

    public function updateStream(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'url'   => 'required|string',
        ]);

        $url = $validated['url'];
        $videoId = $url;

        if (str_contains($url, 'youtube.com/watch?v=')) {
            parse_str(parse_url($url, PHP_URL_QUERY), $params);
            $videoId = $params['v'] ?? $url;
        } elseif (str_contains($url, 'youtu.be/')) {
            $videoId = basename(parse_url($url, PHP_URL_PATH));
        }

        $stream = Stream::first() ?? new Stream();
        $stream->title = $validated['title'];
        $stream->stream_url = $videoId;
        $stream->admin_id = auth()->id() ?? 1;
        $stream->save();

        return back()->with('message', 'Portal Multimedia telah dikemaskini!');
    }
}
