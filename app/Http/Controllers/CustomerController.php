<?php

namespace App\Http\Controllers;

use App\Enums\UserRole;
use App\Http\Requests\CustomerStoreRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Illuminate\Support\Str;

class CustomerController extends Controller
{
    public function create()
    {
        return Inertia::render("Register");
    }

    public function store(CustomerStoreRequest $request){
        $data = $request->validated();


        $user = User::create([
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'middle_name' => $data['middle_name'],
            'email' => $data['email'],
            'phone' => $data['phone'],
            'password' => Hash::make($data['password']),
            'role' => UserRole::CUSTOMER->value,
            'remember_token' => Str::random(10),
        ]);


        return redirect()->route('login');
    }
}
