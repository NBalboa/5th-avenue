<?php

namespace App\Models;

use App\Enums\IsDeleted;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    public function products(){
        return $this->hasMany(Product::class, 'category_id');
    }


    public function scopeIsNotDeleted($query)
    {
        return $query->where('is_deleted', "=", IsDeleted::NO->value);
    }

    public function scopeSearch($query, $search){
        return $query->where('name', 'like', "%$search%");
    }
}
