<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/', [UserController::class, "index"]);
Route::get('/login', [UserController::class, 'login'])->name('login');

Route::get('/register', [CustomerController::class, 'create']);

Route::get('/dashboard', [AdminController::class, 'index']);
Route::get('/products', [ProductController::class, 'index'])->name('products.index');

Route::get('/suppliers', [SupplierController::class, 'index'])->name('suppliers.index');
Route::post('/suppliers', [SupplierController::class, 'store'])->name('suppliers.store');
Route::put('/suppliers/{supplier}', [SupplierController::class, 'update'])->name('suppliers.update');
Route::delete('/suppliers/{supplier}', [SupplierController::class, 'delete'])->name('suppliers.delete');
