<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\Category;
use App\Models\Product;
use App\Models\Table;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        Category::factory(count: 5)->has(Product::factory(5))->create();
        // Table::factory(3)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        // return [
        //     'name' => fake()->name(),
        //     'email' => fake()->unique()->safeEmail(),
        //     'email_verified_at' => now(),
        //     'password' => static::$password ??= Hash::make('password'),
        //     'remember_token' => Str::random(10),
        // ];

        User::create([
            'first_name' => 'John Nigel',
            'last_name' => 'Sipe',
            'email' => 'admin@admin.com',
            'phone' => '09123456788',
            'role' => UserRole::ADMIN->value,
            'remember_token' => Str::random(10),
            'password' =>  Hash::make('password')
        ]);

        // User::create([
        //     'first_name' => 'Nicko',
        //     'last_name' => 'Balboa',
        //     'email' => 'nickojek2x@gmail.com',
        //     'phone' => '09123456789',
        //     'role' => UserRole::CUSTOMER->value,
        //     'remember_token' => Str::random(10),
        //     'password' =>  Hash::make('password')
        // ]);
    }
}
