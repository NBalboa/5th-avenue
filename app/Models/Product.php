<?php

namespace App\Models;

use App\Enums\IsAvailable;
use App\Enums\IsDeleted;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'category_id',
        'image',
        'name',
        'price',
        'quantity'
    ];


    public function scopeIsNotDeleted($query)
    {
        return $query->where('is_deleted', '=', IsDeleted::NO->value);
    }

    public function scopeIsAvailable($query)
    {
        return $query->where('is_available', '=', IsAvailable::YES->value);
    }

    public function scopeSearch($query, $search)
    {
        return $query->whereAny(
            [
                'name',
                'quantity',
                'price'
            ],
            'like',
            '%' . $search . '%'
        );
    }

    public function scopeByCategory($query, $category)
    {
        return $query->where('category_id', '=', $category);
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }
}
