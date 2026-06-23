<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Asset extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'file_path',
        'status',
        'cont_id',
    ];

    public function contributor(): BelongsTo
    {
        return $this->belongsTo(Contributor::class, 'cont_id');
    }
}
