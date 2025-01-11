<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'customer_id',
        'tendered_by',
        'table_id',
        'total',
        'amount_render',
        'order_status',
        'payment_status'
    ];

    public function items(){

        return $this->hasMany(OrderItem::class, 'order_id');
    }


    public function scopeSearch($query, $search){
        return $query->whereAny([
            'id',
            'table_id',
            'total'
        ], "like", "%$search%");
    }

    public function scopeOrderStatus($query, $status){
        return $query->where('order_status', '=', $status);
    }
    public function scopePaymentStatus($query, $status){
        return $query->where('payment_status', '=', $status);
    }
}
