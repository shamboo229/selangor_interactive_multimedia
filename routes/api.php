<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;

Route::get('/streams/{id}', function ($id) {
    // Explicitly search by the column name
    $stream = DB::table('streams')
                ->where('stream_id', '=', $id)
                ->first();

    if (!$stream) {
        return response()->json([
            'message' => 'Stream not found',
            'searched_id' => $id
        ], 404);
    }

    return response()->json($stream);
});
Route::get('/streams', function () {
    return \Illuminate\Support\Facades\DB::table('streams')->get();
});
