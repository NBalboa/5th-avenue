<?php

use App\Http\Controllers\CustomerController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [UserController::class, "index"]);
Route::get('/login', [UserController::class, 'login'])->name('login');

Route::get('/register', [CustomerController::class, 'create']);
