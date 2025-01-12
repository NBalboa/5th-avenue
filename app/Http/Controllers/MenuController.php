<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\Table;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MenuController extends Controller
{
    //

    public function index(Request $request){
        $categories = Category::isNotDeleted()->get();
        $products = Product::with('category');

        $category = $request->input('category');
        $search = $request->input('search');

        if($category){
            $products = $products->byCategory($category);
        }

        if($search){
            $products = $products->search($search);
        }

        $search = $request->input('search');
        $products = $products->isAvailable()->isNotDeleted()->latest()->paginate(12)->withQueryString();

        return Inertia::render('Menus', [
            'categories' => $categories,
            'products' => $products,
            'filters' => [
                'category' => $category,
                'search' => $search
            ]
        ]);
    }


    public function create(Request $request,Table $table){

        $categories = Category::isNotDeleted()->get();
        $products = Product::with('category');

        $category = $request->input('category');
        $search = $request->input('search');

        if($category){
            $products = $products->byCategory($category);
        }

        if($search){
            $products = $products->search($search);
        }

        $search = $request->input('search');
        $products = $products->isAvailable()->isNotDeleted()->latest()->paginate(12)->withQueryString();


        return Inertia::render('MenuOrder', [
            'table' => $table,
            'categories' => $categories,
            'products' => $products,
            'filters' => [
                'category' => $category,
                'search' => $search
            ]
        ]);
    }
}
