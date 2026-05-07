<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    use HasFactory;

    protected $table = 'news';
    protected $primaryKey = 'news_id';
    protected $fillable = [
        'admin_id',
        'headline',
        'content',
        'is_featured',
        'publish_date',
        'resource',
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
