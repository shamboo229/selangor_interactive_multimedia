<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Asset extends Model
{
    protected $primaryKey = 'asset_id';
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'category',
        'file_path',
        'status',
        'cont_id',
        'views',
    ];

    public function contributor(): BelongsTo
    {
        return $this->belongsTo(Contributor::class, 'cont_id');
    }
}
