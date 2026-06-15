<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Asset;
use App\Models\Contributor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AssetController extends Controller
{
    public function index()
    {
        $publishedAssets = Asset::with('contributor')
            ->where('status', 'published')
            ->latest()
            ->get();

        return Inertia::render('Admin/MediaManager', [
            'assets' => $publishedAssets
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'contributor_name' => 'required|string|max:255',
            'email'            => 'required|email|max:255',
            'title'            => 'required|string|max:255',
            'category'         => 'required|string',
            'file'             => 'required|file|mimes:jpeg,png,jpg,gif,svg,pdf,mp4|max:51200',
        ]);

        $filePath = null;
        if ($request->hasFile('file')) {
            $filePath = $request->file('file')->store('assets', 'public');
        }

        $contributor = Contributor::firstOrCreate(
            ['email' => $request->email],
            [
                'cont_name'     => $request->contributor_name,
                'password'      => Hash::make(Str::random(16)),
                'orgranization' => $request->orgranization,
            ]
        );

        Asset::create([
            'title'     => $request->title,
            'category'  => $request->category,
            'status'    => 'published',
            'cont_id'   => $contributor->cont_id,
            'file_path' => $filePath,
            'views'     => 0,
        ]);

        return redirect()->back()->with('success', 'Asset uploaded successfully.');
    }

    public function destroy($id)
    {
        $asset = Asset::findOrFail($id);

        if ($asset->file_path && Storage::disk('public')->exists($asset->file_path)) {
            Storage::disk('public')->delete($asset->file_path);
        }

        $asset->delete();

        return redirect()->back()->with('success', 'Asset deleted successfully.');
    }
}
