<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\TableController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\AdminOnly;
use Illuminate\Support\Facades\Route;

Route::get('/', [UserController::class, "index"])->name('home');

Route::middleware('guest')->group(function() {
    Route::get('/login', [UserController::class, 'login'])->name('login');
    Route::post('/login', [UserController::class, 'signin'])->name('users.login');

    Route::get('/register', [CustomerController::class, 'create'])->name('customers.create');
    Route::post('/register', [CustomerController::class, 'store'])->name('customers.store');
});


Route::middleware(['auth'])->group(function () {
    Route::post('/logout', [UserController::class, 'logout'])->name('users.logout');

    Route::middleware([AdminOnly::class])->group(function () {
        Route::get('/dashboard', [AdminController::class, 'index'])->name('dashboard');
        Route::get('/products', [ProductController::class, 'index'])->name('products.index');
        Route::post('/products', [ProductController::class, 'store'])->name('products.store');
        Route::put('/products/available/{product}', [ProductController::class, 'updateAvailable'])->name('products.updateAvailable');
        Route::post('/products/{product}', [ProductController::class, 'update'])->name('products.update');
        Route::delete('/products/{product}', [ProductController::class, 'delete'])->name('products.delete');

        Route::get('/suppliers', [SupplierController::class, 'index'])->name('suppliers.index');
        Route::post('/suppliers', [SupplierController::class, 'store'])->name('suppliers.store');
        Route::put('/suppliers/{supplier}', [SupplierController::class, 'update'])->name('suppliers.update');
        Route::delete('/suppliers/{supplier}', [SupplierController::class, 'delete'])->name('suppliers.delete');

        Route::get('/categories', [CategoryController::class, 'index'])->name('categories.index');
        Route::post('/categories', [CategoryController::class, 'store'])->name('categories.store');
        Route::put('/categories/{category}', [CategoryController::class, 'update'])->name('categories.update');
        Route::delete('/categories/{category}', [CategoryController::class, 'delete'])->name('categories.delete');


        Route::get('/tables', [TableController::class, 'index'])->name('tables.index');
        Route::post('/tables', [TableController::class, 'store'])->name('tables.store');
        Route::put('/tables/{table}', [TableController::class, 'update'])->name('tables.update');

        Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');
        Route::get('/orders/create', [OrderController::class, 'create'])->name('orders.create');
        Route::post('/orders/create', [OrderController::class, 'store'])->name('orders.store');
        Route::put('/orders/update/orderstatus/{order}', [OrderController::class, 'updateOrderStatus'])->name('orders.updateOrderStatus');
        Route::put('/orders/update/paymentstatus/{order}', [OrderController::class, 'updatePaymentStatus'])->name('orders.updatePaymentStatus');
        Route::get('/orders/items/{order}', [OrderController::class, 'items'])->name('orders.items');
    });

});

