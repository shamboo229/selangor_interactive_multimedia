<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\News;

class NewsController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/NewsIndex');
    }
}
