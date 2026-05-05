<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Stream;

class AdminController extends Controller
{
    public function Dashboard()
    {
        // Fetch only the currently active stream
        $activeStream = Stream::where('is_active', true)->first();

        return Inertia::render('Admin/Dashboard', [
            'currentStream' => [
                'title' => '',
                'url'   =>  '',
            ],
            'stats' => [
                'active_users' => 0,
                'total_views'  => 0,
            ]
        ]);
    }

    public function updateStream(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'url'   => 'required|string',
        ]);

        $videoId = $this->extractYoutubeId($validated['url']);

        DB::transaction(function () use ($validated, $videoId) {
            Stream::where('is_active', true)->update(['is_active' => false]);
            Stream::create([
                'title'      => $validated['title'],
                'stream_url' => $videoId,
                'admin_id'   => Auth::id() ?? 1,
                'is_active'  => true,
            ]);
        });

        return back()->with('message', 'Siaran baharu telah diterbitkan!');
    }

    private function extractYoutubeId(string $url): string
    {
        if (preg_match('/^[a-zA-Z0-9_-]{11}$/', $url)) {
            return $url;
        }

        $parts = parse_url($url);

        if (isset($parts['host']) && ($parts['host'] === 'youtu.be' || $parts['host'] === 'www.youtu.be')) {
            return ltrim($parts['path'], '/');
        }

        if (isset($parts['query'])) {
            parse_str($parts['query'], $query);
            return $query['v'] ?? $url;
        }

        return $url;
    }
}
