<?php

namespace App\Http\Controllers;

use App\Enums\CartType;
use App\Enums\OrderStatus;
use App\Enums\PaymentStatus;
use App\Http\Requests\CartStoreRequest;
use App\Http\Requests\OnlineOrderStoreRequest;
use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Table;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CartController extends Controller
{

    public function index(){

        $user_id = Auth::user()->id;
        $user = User::where('id', '=', $user_id)->first();

        $carts = $user->carts()
            ->get()
            ->groupBy('table_id')
            ->values()
            ->toArray();


        return Inertia::render('Carts', [
            'carts' => $carts
        ]);
    }

    public function store(CartStoreRequest $request){

        $data = $request->validated();
        $user_id = Auth::user()->id;
        $user = User::where('id', '=',  $user_id)->first();
        $productExist = $user->carts()->where('product_id', '=', $data['product'])
            ->where('table_id', '=', $data['table'])
            ->exists();

        if(!$productExist){
            Cart::create([
                'table_id' => $data['table'],
                'product_id' => $data['product'],
                'user_id' => $user->id,
                'cart_type' => CartType::ORDER,
                'quantity' => 1
            ]);

            return back();

        }
        else {
            return back()->withErrors(['exist' => 'Product already added to cart']);
        }
    }


    public function checkout(Table $table) {

        $user_id = Auth::user()->id;
        $user = User::where('id', '=', $user_id)->first();
        $carts = $user->carts()->with('product')->where('user_id', '=', $user->id)->where('table_id', '=', $table->id)->get();



        return Inertia::render('Checkout', [
            'carts' => $carts,
            'table' => $table
        ]);
    }


    public function order(OnlineOrderStoreRequest $request, Table $table){
        $data  = $request->validated();
        $user_id = Auth::user()->id;
        $user = User::where('id', '=', $user_id)->first();
        $carts = $user->carts()->with('product')->where('user_id', '=', $user->id)->where('table_id', '=', $table->id)->get();

        $order = Order::create([
            'customer_id' => $user->id,
            'table_id' => $table->id,
            'total' => $data['total'],
            'order_status' => OrderStatus::PENDING->value,
            'payment_status' => PaymentStatus::PENDING->value
        ]);

        foreach($carts as $cart){
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $cart->product->id,
                'price' => $cart->product->price,
                'quantity' => $cart->quantity
            ]);
        }

        $user->carts()->with('product')->where('user_id', '=', $user->id)->where('table_id', '=', $table->id)->delete();
        return redirect()->route('home');
    }

    public function addQuantity(Cart $cart){
        $cart->quantity = $cart->quantity + 1;
        $cart->save();


        return back();
    }

    public function minusQuantity(Cart $cart){
        $cart->quantity = $cart->quantity - 1;
        $cart->save();

        return back();
    }

    public function delete(Cart $cart){
        $cart->delete();

        return back();
    }
}
