<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    //

    protected $fillable = [
        'product_id',
        'supplier_id',
        'quantity',
        'description'
    ];

    public function scopeSearch($query, $search){
        return $query->whereAny(['quantity', 'description'], 'like', "%$search%");
    }
    public function supplier(){
        return $this->belongsTo(Supplier::class);
    }

    public function product() {
        return $this->belongsTo(Product::class);
    }
}
