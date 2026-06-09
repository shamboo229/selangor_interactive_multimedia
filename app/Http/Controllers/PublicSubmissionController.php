<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Asset;
use App\Models\Contributor;
use Inertia\Inertia;

class PublicSubmissionController extends Controller
{
    public function store(Request $request)
    {
        // 1. Validate the form
        $request->validate([
            'contributor_name' => 'required|string|max:255',
            'email'            => 'required|email|max:255',
            'title'            => 'required|string|max:255',
            'category'         => 'required|string',
            'file'             => 'required|file|mimes:jpg,jpeg,png,pdf,mp4|max:51200',
        ]);

        // 2. Find or create the contributor
        $contributor = Contributor::firstOrCreate(
            ['email' => $request->email],
            ['cont_name' => $request->contributor_name]
        );

        // 3. Initialize file path
        $filePath = null;

        // 4. Safely upload the file
        if ($request->hasFile('file')) {
            $filePath = $request->file('file')->store('assets', 'public');
        }

        // 5. Create ONE asset record using the uploaded file path
        Asset::create([
            'title'     => $request->title,
            'category'  => $request->category,
            'file_path' => $filePath,
            'status'    => 'pending',
            'cont_id'   => $contributor->cont_id ?? $contributor->id, // Link to the contributor
            'views'     => 0,
        ]);

        // 6. Return success message
        return back()->with('success', 'Karya berjaya dihantar!');
    }
}
