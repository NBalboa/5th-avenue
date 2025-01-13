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
        'payment_status',
        'order_type'
    ];


    public function customer() {
        return $this->belongsTo(User::class, 'customer_id');
    }

    public function booking(){
        return $this->hasOne(Booking::class, 'order_id');
    }
    public function cashier() {
        return $this->belongsTo(User::class, 'tendered_by');
    }
    public function table() {
        return $this->belongsTo(Table::class, 'table_id');
    }
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
