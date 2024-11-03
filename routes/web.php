<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/', [UserController::class, "index"]);
Route::get('/login', [UserController::class, 'login'])->name('login');

Route::get('/register', [CustomerController::class, 'create']);

Route::get('/dashboard', [AdminController::class, 'index']);
Route::get('/products', [ProductController::class, 'index'])->name('products.index');
