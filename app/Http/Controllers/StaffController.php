<?php

namespace App\Http\Controllers;

use App\Http\Requests\StaffStoreRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
class StaffController extends Controller
{
    public function store(StaffStoreRequest $request){
        $data = $request->validated();
        if ($request->hasFile('image')) {
            $idPicturePath = $request->file('image')->store('idpicture/images', 'public');
        }

        if ($request->hasFile('profile')) {
            $profilePath = $request->file('image')->store('profile/images', 'public');
        }

        User::create([
            'image' => $idPicturePath,
            'profile' => $profilePath,
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'middle_name' => $data['middle_name'],
            'phone' => $data['phone'],
            'email' => $data['email'],
            'role' => $data['role'],
            'password' => Hash::make($data['password']),
            'remember_token' => Str::random(10),
        ]);


        return back();
    }
}
