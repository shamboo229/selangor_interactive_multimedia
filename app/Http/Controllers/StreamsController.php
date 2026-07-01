<?php

namespace App\Http\Controllers;

use App\Models\Stream;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StreamsController extends Controller
{
    public function index()
    {
        $streams = Stream::orderBy('created_at', 'desc')->get();

        return Inertia::render('Admin/StreamsIndex', [
            'streams' => $streams
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'stream_url' => 'required|string',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        if ($request->boolean('is_active')) {
            Stream::query()->update(['is_active' => false]);
        }

        Stream::create([
            'title' => $validated['title'],
            'stream_url' => $validated['stream_url'],
            'description' => $validated['description'],
            'is_active' => $request->boolean('is_active') ? 1 : 0,
        ]);

        return redirect()->back()->with('success', 'Stream archive added successfully!');
    }

    public function edit($id)
    {
        $stream = Stream::findOrFail($id);

        return Inertia::render('Admin/Streams/Edit', [
            'stream' => $stream
        ]);
    }

    public function update(Request $request, $id)
    {
        $stream = Stream::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'stream_url' => 'required|string',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        if ($request->boolean('is_active')) {
            Stream::where('stream_id', '!=', $id)->update(['is_active' => false]);
        }

        $stream->update([
            'title' => $validated['title'],
            'stream_url' => $validated['stream_url'],
            'description' => $validated['description'],
            'is_active' => $request->boolean('is_active') ? 1 : 0,
        ]);

        return redirect()->back()->with('success', 'Stream archive updated successfully!');
    }

    public function destroy($id)
    {
        $stream = Stream::findOrFail($id);
        $stream->delete();

        return redirect()->back()->with('success', 'Stream archive deleted successfully.');
    }
}
