<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Booking extends Model
{
    protected $fillable = [
        'user_id',
        'table_id',
        'order_id',
        'gcash_reference_id',
        'confirmed_by',
        'image',
        'date',
        'time',
        'no_people',
        'booking_status',
    ];

    public function scopeSearch($query, $search){

        return $query->whereAny([
            'id',
            'table_id',
            'order_id',
            'gcash_reference_id',
            'no_people',
        ], 'like', "%$search%");
    }

    public function date(): Attribute
    {
        return Attribute::make(
            get: fn($value) => $value ? Carbon::parse($value)->format('F j, Y') : null
        );
    }


    public function time(): Attribute
    {
        return Attribute::make(
            get: fn($value) => $value ? Carbon::parse($value)->format('g:i A') : null
        );
    }
    public function image(): Attribute
    {
        return Attribute::make(
            get: fn($value) => $value ? Storage::url($value) : null
        );
    }

    public function scopeByStatus($query, $status){
        return $query->where('booking_status', '=', $status);
    }

    public function scopeByTime($query, $time) {
        return $query->whereTime('time','>=', $time);
    }

    public function scopeByDate($query, $date){
        return $query->whereDate('date', '>=', $date);
    }

    public function scopeSearchByDate($query, $date){
        return $query->whereDate('created_at', $date);
    }

    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }

    public function table(){
        return $this->belongsTo(Table::class, 'table_id');
    }

    public function order(){
        return $this->belongsTo(Order::class, 'order_id');
    }

    public function confirmed() {
        return $this->belongsTo(User::class, 'confirmed_by');
    }
}
