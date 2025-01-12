<?php

namespace App\Http\Controllers;

use App\Enums\UserRole;
use App\Http\Requests\SigninRequest;
use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $products = Product::with('category');
        $categories = Category::get();

        $category = $request->input('category');
        $search = $request->input('search');
        if($search){
            $products = $products->search($search);
        }

        if($category){
            $products = $products->byCategory($category);
        }



        $products = $products->latest()->take(10)->get();

        return Inertia::render("Welcome", [
            'products' => $products,
            'categories' => $categories,
            'filters' => [
                'category' => $category,
                'search' => $search
            ]
        ]);
    }

    public function orders(Request $request){
        $user_id = Auth::user()->id;
        $user = User::where('id', '=', $user_id)->first();
        $orders = $user->orders()->with('table');

        $order = $request->input('order');
        $search = $request->input('search');
        $payment = $request->input('payment');

        if($search){
            $orders = $orders->search($search);
        }

        if($order){
            $orders = $orders->orderStatus($order);
        }

        if($payment){
            $orders = $orders->paymentStatus($payment);
        }

        $orders = $orders->latest()->paginate(10)->withQueryString();

        return Inertia::render('MyOrders', [
            'orders' => $orders,
            'filters' => [
                'order' => $order,
                'payment' => $payment,
                'search' => $search
            ]
        ]);
    }


    public function items(Order $order) {
        $order = $order->load( 'cashier', 'table');
        $items = $order->items()->with('product')->get();

        return Inertia::render('MyItems', [
            "order" => $order,
            "items" => $items
        ]);
    }

    public function login()
    {
        return Inertia::render("Login");
    }

    public function signin(SigninRequest $request) {
        $data = $request->validated();

        $user = User::where('email', $data['email'])->first();

        if($user && Hash::check($data['password'], $user->password)){
            Auth::login($user);
            Session::regenerate();
            if($user->role === UserRole::ADMIN->value){
                return redirect()->route("dashboard");
            }
            if($user->role === UserRole::CUSTOMER->value){
                return redirect()->route('home');
            }
        }
        else {
            return redirect()->route('login')->withErrors(['invalid' => 'Invalid Email/Password']);
        }
    }

    public function logout(){
        Auth::logout();
        Session::regenerate();

        return redirect()->route('home');
    }
}
