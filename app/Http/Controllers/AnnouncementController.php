<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnnouncementController extends Controller
{
    public function edit()
    {
        $announcement = Announcement::first();

        return Inertia::render('Admin/AnnouncementManager', [
            'announcement' => $announcement
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'content' => 'required|string|max:500',
        ]);

        $announcement = Announcement::firstOrCreate([]);
        $announcement->update([
            'content' => $request->content
        ]);

        return redirect()->back()->with('success', 'Announcement updated successfully.');
    }
}
