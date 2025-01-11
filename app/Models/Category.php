<?php

namespace App\Models;

use App\Enums\IsDeleted;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{

    protected $fillable = ['name'];


    public function scopeIsNotDeleted($query)
    {
        return $query->where('is_deleted', "=", IsDeleted::NO->value);
    }

    public function scopeSearch($query, $search){
        return $query->where('name', 'like', "%$search%");
    }
}
