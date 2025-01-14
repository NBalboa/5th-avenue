<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    protected $fillable = [
        'user_id',
        'supplier_id',
        'street',
        'province',
        'city',
        'barangay'
    ];
}
