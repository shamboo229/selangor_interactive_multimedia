<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Contributor extends Authenticatable
{
    use Notifiable;

    protected $primaryKey = 'cont_id';

    protected $fillable = [
        'cont_name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];
}
