<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $suppliers = Supplier::isNotDeleted()->get();
        $categories = Category::isNotDeleted()->get();

        return Inertia::render("Admin/Products", [
            'suppliers' => $suppliers,
            'categories' => $categories,
        ]);
    }
}
