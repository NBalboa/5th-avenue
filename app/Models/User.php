<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Enums\IsDeleted;
use App\Enums\UserRole;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Storage;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'middle_name',
        'phone',
        'email',
        'password',
        'role',
        'profile',
        'image'
    ];
    public function image(): Attribute
    {
        return Attribute::make(
            get: fn($value) => $value ? Storage::url($value) : null
        );
    }
    public function profile(): Attribute
    {
        return Attribute::make(
            get: fn($value) => $value ? Storage::url($value) : null
        );
    }
    public function carts(){
        return $this->hasMany(Cart::class, 'user_id');
    }

    public function bookings() {
        return $this->hasMany(Booking::class, 'user_id');
    }

    public function orders() {
        return $this->hasMany(Order::class, 'customer_id');
    }


    public function scopeGetUserById($query, $id){

        return $query->where('id', '=', "$id");
    }

    public function scopeUserType($query, $type){
        return $query->where('role', '=', $type);
    }

    public function scopeGetStaffs($query){
        return $query->where('role', '=', UserRole::CASHIER->value)
            ->orWhere('role', '=', UserRole::MANAGER->value);
    }

    public function scopeSearchByName($query, $search){
        return $query->whereAny([
            'first_name',
            'last_name',
            'middle_name',
        ], 'like', "%$search%");
    }


    public function scopeSearch($query, $search){
        return $query->whereAny([
            'first_name',
            'last_name',
            'middle_name',
            'phone',
            'email'
        ], 'like', "%$search%");
    }


    public function scopeByRole($query, $role){
        return $query->where('role', '=', $role);
    }


    public function scopeIsNotDeleted($query) {
        return $query->where('is_deleted', '=', IsDeleted::NO->value);
    }

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
