<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\News;

class NewsController extends Controller
{
    public function index()
    {
        $news = News::orderBy('publish_date', 'desc')->get();

        return Inertia::render('Admin/NewsIndex', [
            'initialNews' => $news
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'headline' => 'required|string|max:255',
            'resource' => 'required|string|max:255',
            'publish_date' => 'required|date',
            'content' => 'required|string|max:255',
            'is_featured' => 'boolean',
            'image' => 'nullable|image|max:2048',
        ]);

        $imagePath = null;

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('news_covers', 'public');
        }

        News::create([
            'admin_id' => auth()->id(),
            'headline' => $validated['headline'],
            'content' => $validated['content'],
            'is_featured' => $request->boolean('is_featured') ? 1 : 0,
            'publish_date' => $validated['publish_date'],
            'resource' => $validated['resource'],
            'image_path' => $imagePath,
        ]);

        return redirect()->back()->with('success', 'News article published successfully!');
    }

    public function update(Request $request, News $news)
    {
        $validated = $request->validate([
            'headline' => 'required|string|max:255',
            'resource' => 'required|string|max:255',
            'publish_date' => 'required|date',
            'content' => 'required|string|max:255',
            'is_featured' => 'boolean',
            'image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $validated['image_path'] = $request->file('image')->store('news_covers', 'public');
        }

        $validated['is_featured'] = $request->boolean('is_featured') ? 1 : 0;

        $news->update($validated);

        return redirect()->back()->with('success', 'News updated successfully!');
    }
}
