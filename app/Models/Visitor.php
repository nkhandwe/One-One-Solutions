<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Visitor extends Model
{
    protected $fillable = [
        'ip_address',
        'user_agent',
        'browser',
        'os',
        'device',
        'country',
        'city',
        'referrer',
        'url',
    ];
}
