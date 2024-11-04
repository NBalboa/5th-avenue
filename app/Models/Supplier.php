<?php

namespace App\Models;

use App\Enums\IsDeleted;
use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    protected $fillable = [
        'name',
        'phone',
        'telephone',
        'email',
    ];


    public function scopeIsNotDeleted($query)
    {
        return $query->where('is_deleted', '=', IsDeleted::NO->value);
    }

    public function address()
    {
        return $this->hasOne(Address::class);
    }
}
