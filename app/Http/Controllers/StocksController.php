<?php

namespace App\Http\Controllers;

use App\Enums\ByQuantityType;
use App\Models\Category;
use App\Models\Product;
use App\Models\Stock;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StocksController extends Controller
{
    public function index(Request $request) {

        $products = Product::with('category')
            ->hasQuantity();

        $categories = Category::get();
        $suppliers = Supplier::get();

        $search = $request->input('search');
        $by_quantity_type = $request->input('by_quantity_type');
        $category = $request->input('category');


        if($search){
            $products = $products->search($search)
                ->orWhereHas('category', function($query) use($search) {
                    $query->search($search);
                });
        }

        $products = $products->OrderByQuantity((int)$by_quantity_type);

        if($category){
            $products = $products->byCategory($category);
        }

        $products = $products->isNotDeleted()->paginate(10)->withQueryString();

        return Inertia::render('Admin/Stocks', [
            "products" => $products,
            'categories' => $categories,
            'suppliers' => $suppliers,
            'filters' => [
                'search' => $search,
                'by_quantity_type' =>  $by_quantity_type,
                'category' => $category
            ]
        ]);
    }


    public function history(Request $request) {
        $stocks = Stock::with('supplier', 'product');
        $search =  $request->input('search');
        if($request){
            $stocks = $stocks->search($request)
                    ->orWhereHas('supplier', function($query) use($search) {
                        $query->searchByName($search);
                    })
                    ->orWhereHas('product',function($query) use($search) {
                        $query->searchByName($search);
                    });
        }


        $stocks = $stocks->latest()->paginate(10)->withQueryString();
        return Inertia::render('Admin/StocksHistory', [
            'stocks' => $stocks,
            'filters' => [
                'search' => $search
            ]
        ]);
    }
}
