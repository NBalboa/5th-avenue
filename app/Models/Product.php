<?php

namespace App\Models;

use App\Enums\IsAvailable;
use App\Enums\IsDeleted;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        'category_id',
        'image',
        'name',
        'price',
        'quantity'
    ];
    public function image(): Attribute
    {
        return Attribute::make(
            get: fn($value) => Storage::url($value)
        );
    }

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
