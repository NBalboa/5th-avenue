<?php

namespace App\Http\Controllers;

use App\Enums\CartType;
use App\Models\Category;
use App\Models\Product;
use App\Models\Table;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BookingController extends Controller
{
    //

    public function create(Request $request){
        $user_id = Auth::user()->id;

        $user = User::where('id', '=', $user_id)->first();
        $carts = $user->carts()->with('product')->where('cart_type', '=', CartType::BOOKING->value)->get();
        $products = Product::with('category');
        $categories = Category::get();
        $tables = Table::get();

        $category = $request->input('category');
        $search = $request->input('search');

        if ($search) {
            $products = $products->search($search);
        }

        if($category) {
            $products = $products->byCategory($category);
        }



        $products = $products->isNotDeleted()->isAvailable()->latest()->paginate(10)->withQueryString();

        return Inertia::render('MyBooking', [
            'products' => $products,
            'categories' => $categories,
            'tables' => $tables,
            'carts' => $carts,
            'filters' => [
                'search' => $search,
                'category' => $category
            ]
        ]);
    }

}
