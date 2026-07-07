<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stream extends Model
{

    use HasFactory;

    protected $primaryKey = 'stream_id';
    protected $fillable = ['title', 'stream_url', 'is_active', 'admin_id', 'description',];
}
