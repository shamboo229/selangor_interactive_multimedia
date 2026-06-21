<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class News extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'news';
    protected $primaryKey = 'news_id';
    protected $fillable = [
        'admin_id',
        'headline',
        'content',
        'is_featured',
        'publish_date',
        'resource',
        'image_path',
    ];

    protected $casts = [
        'publish_date' => 'date',
        'is_featured' => 'integer',
    ];

    public function admin()
    {
        return $this->belongsTo(Admin::class, 'admin_id');
    }
}
