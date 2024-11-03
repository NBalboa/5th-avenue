<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        return Inertia::render("Welcome");
    }

    public function login()
    {
        return Inertia::render("Login");
    }
}
