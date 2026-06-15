<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Asset extends Model
{
    protected $primaryKey = 'asset_id';

    protected $fillable = [
        'title',
        'category',
        'status',
        'cont_id',
        'file_path',
        'views',
    ];

    public function contributor()
    {
        return $this->belongsTo(Contributor::class, 'cont_id', 'cont_id');
    }
}
