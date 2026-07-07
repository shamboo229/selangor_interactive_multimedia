<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Announcement extends Model
{
    use HasFactory;
    protected $fillable = ['admin_id','content', 'is_active'];

    public function admin(): BelongTo{
        return $this->belongTo(Admin::class, 'admin_id', 'admin_id');
    }
}
