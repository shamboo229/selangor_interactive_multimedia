<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PendingSubmission extends Model
{
    use HasFactory;

    protected $fillable = [
        'contributor_name',
        'email',
        'title',
        'category',
        'file_path',
        'status',
    ];
}
