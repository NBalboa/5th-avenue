<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Table extends Model
{

    use HasFactory;

    public $fillable = [
        'no',
        'name',
        'description'
    ];


    public function scopeSearch($query, $search){
        return $query->whereAny([
            'no',
            'name',
            'description',
        ], 'like', "%$search%");
    }
}
