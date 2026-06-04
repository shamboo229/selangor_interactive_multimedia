<?php

namespace App\Http\Controllers;

use App\Models\PendingSubmission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PublicSubmissionController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'contributor_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'title' => 'required|string|max:255',
            'category' => 'required|string|in:Artworks,Posters,Videos,Animations,PDF',
            'file' => 'required|file|max:51200', // Set up to 50MB maximum limit
        ]);

        if ($request->hasFile('file')) {
            // Save inside local storage folder: storage/app/public/pending/
            $path = $request->file('file')->store('pending', 'public');

            PendingSubmission::create([
                'contributor_name' => $request->contributor_name,
                'email' => $request->email,
                'title' => $request->title,
                'category' => $request->category,
                'file_path' => $path,
                'status' => 'pending',
            ]);
        }

        return redirect()->back();
    }
}
