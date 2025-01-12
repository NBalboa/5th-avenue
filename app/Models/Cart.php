<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    protected $fillable  = [
        'user_id',
        'table_id',
        'product_id',
        'cart_type',
        'quantity'
    ];

    public function user() {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function table(){
        return $this->belongsTo(Table::class, 'table_id');
    }

    public function product() {
        return $this->belongsTo(Product::class, 'product_id');
    }
}
