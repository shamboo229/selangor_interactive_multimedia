<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contributor extends Model
{
    protected $primaryKey = 'cont_id';

    protected $fillable = [
        'cont_name',
        'email',
    ];

}
