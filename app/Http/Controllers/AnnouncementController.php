<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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

        $adminId = Auth::id();

        $announcement = Announcement::firstOrCreate([], [
            'admin_id' => $adminId,
            'content' => $request->content,
        ]);

        if (!$announcement->wasRecentlyCreated) {
            $announcement->update([
                'admin_id' => $adminId,
                'content' => $request->content
            ]);
        }

        return redirect()->back()->with('success', 'Announcement updated successfully.');
    }
}
