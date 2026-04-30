<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Asset;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AssetController extends Controller
{
    // ADD THIS: This function loads your React page
    public function create()
    {
        return Inertia::render('Upload'); // This looks for resources/js/Pages/Upload.jsx
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required',
            'multimedia_file' => 'required|file|mimes:jpg,png,mp4,pdf|max:20480',
        ]);

        if ($request->hasFile('multimedia_file')) {
            $path = $request->file('multimedia_file')->store('assets', 'public');

            Asset::create([
                'cont_id'   => 1,
                'title'     => $request->title,
                'category'  => $request->category,
                'file_path' => $path,
                'status'    => 'pending',
            ]);

            // CHANGE THIS: Redirect to a route (e.g., your dashboard)
            return redirect()->route('dashboard')->with('message', 'Asset uploaded to SIM Centralized successfully!');
        }
    }
}
