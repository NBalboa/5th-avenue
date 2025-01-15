<?php

namespace App\Models;

use App\Enums\ByQuantityType;
use App\Enums\IsAvailable;
use App\Enums\IsDeleted;
use App\Enums\OrderType;
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

    public function scopeHasQuantity($query){
        return $query->where('quantity', '!=', null);
    }

    public function scopeGetProductById($query, $id){
        return $query->where('id', '=', "$id");
    }

    public function scopeIsNotDeleted($query)
    {
        return $query->where('is_deleted', '=', IsDeleted::NO->value);
    }

    public function scopeIsAvailable($query)
    {
        return $query->where('is_available', '=', IsAvailable::YES->value);
    }

    public function scopeOrderByQuantity($query, $type){
        $type_string = "desc";

        if($type === ByQuantityType::LOWEST_TO_HIGHEST->value){
            $type_string = 'asc';
        }

        return $query->orderBy('quantity', $type_string);

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

    public function scopeSearchByName($query, $search){
        return $query->where('name', 'like', "%$search%");
    }


}
