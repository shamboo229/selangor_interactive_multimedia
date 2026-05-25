<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Asset;
use App\Models\Contributor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AssetController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/MediaLibrary', [
            'assets' => Asset::with('contributor')->latest()->get()
        ]);
    }
    public function create()
    {
        return Inertia::render('Admin/Assets/Form', [
            'contributors' => Contributor::select('cont_id', 'name')->get()
        ]);
    }
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max|255',
            'category' => 'required|string',
            'status' => 'required|string',
            'cont_id' => 'nullable|exists:contributors,cont_id',
            'file' => 'required|file|mimes:jpeg,png,jpg,gif,svg,pdf,mp4|max:51200', // 50MB max limit
        ]);

        $filePath = null;
        if ($request->hasFile('file')) {
            $filePath = $request->file('file')->store('assets', 'public');
        }

        Asset::create([
            'title' => $request->title,
            'category' => $request->category,
            'status' => $request->status,
            'cont_id' => $request->cont_id,
            'file_path' => $filePath,
            'views' => 0,
        ]);

        return redirect()->route('admin.assets.index')->with('success', 'Asset uploaded successfully.');
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
