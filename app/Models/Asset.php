<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Asset extends Model
{
    // Tell Laravel to look for 'asset_id' instead of 'id'
    protected $primaryKey = 'asset_id';

    // Allow these fields to be filled during upload
    protected $fillable = ['cont_id', 'title', 'category', 'status', 'file_path', 'views'];

    // This creates the link to the Contributor
    public function contributor()
    {
        return $this->belongsTo(Contributor::class, 'cont_id', 'cont_id');
    }
}
