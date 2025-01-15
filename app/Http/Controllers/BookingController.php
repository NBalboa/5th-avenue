<?php

namespace App\Http\Controllers;

use App\Enums\BookingStatus;
use App\Enums\CartType;
use App\Enums\OrderStatus;
use App\Enums\OrderType;
use App\Enums\PaymentStatus;
use App\Http\Requests\BookingStoreRequest;
use App\Http\Requests\BookingUpdateStatus;
use App\Http\Requests\BookingUpdateStatusRequest;
use App\Models\Booking;
use App\Models\Category;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\Stock;
use App\Models\Table;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BookingController extends Controller
{
    public function index(Request $request){
        $bookings = Booking::with('user','table','order');
        $booking = $request->input('booking');
        $date = $request->input('date');
        $search = $request->input('search');
        $time = $request->input('time');

        if($search){
            $bookings = $bookings->search($search)
                ->orWhereHas('user', function($query) use($search) {
                    $query->searchByName($search);
                });
        }

        if($booking){
            $bookings = $bookings->byStatus($booking);
        }
        if($date){
            $bookings = $bookings->byDate($date);
        }

        if($time){
            $bookings = $bookings->byTime($time);
        }

        $datetimeLocalValue = $date . 'T' . substr($time, 0, 5); // "2025-01-15T14:10"

        $bookings = $bookings->get();
        return Inertia::render('Admin/Bookings', [
            'bookings' => $bookings,
            'filters' => [
                'search' => $search,
                'booking' => $booking,
                'dateTimeLocalValue' => $datetimeLocalValue
            ],
        ]);
    }

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

        return Inertia::render('CreateBooking', [
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

    public function updateStatus(BookingUpdateStatusRequest $request,Booking $booking){
        $data = $request->validated();

        if((int) $data['status'] === BookingStatus::CONFIRM->value && $booking->order_id){
            $order = $booking->order()->first();

            if(!$order->tendered_by){
                $order->tendered_by = Auth::user()->id;
            }

            $items = $order->items()->get();

            foreach ($items as $item){
                $item->load('product');

                if($item->product->quantity !== null && $item->product->quantity >= $item->quantity  && !$order->tendered_by){
                    Product::getProductById($item->product_id)->decrement('quantity', $item->quantity);
                    Stock::create([
                        'product_id' => $item->product_id,
                        'quantity' =>  $item->quantity,
                        'description' => "Sale"
                    ]);
                }
                else{
                    $item->delete();
                }
            }

            $order->save();
        }
        $booking->booking_status = $data['status'];

        $booking->save();

        return back();
    }

    public function store(BookingStoreRequest $request){
        $data = $request->validated();
        $user_id = Auth::user()->id;
        $user = User::where('id', '=', $user_id)->first();
        $carts = $user->carts()->with('product')->where('cart_type', '=', CartType::BOOKING->value)->get();


        $hasOrder = (bool) $data['has_order'];

        if($hasOrder === true){
            $order = Order::create([
                'customer_id' => $user->id,
                'table_id' => $data['table'],
                'total' => $data['total'],
                'order_status' => OrderStatus::PENDING->value,
                'payment_status' => PaymentStatus::PENDING->value,
                'order_type' => OrderType::BOOKING->value,
            ]);

            foreach($carts as $cart){
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $cart->product->id,
                    'price' => $cart->product->price,
                    'quantity' => $cart->quantity
                ]);
            }
        }

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('gcash/images', 'public');
        }

        Booking::create([
            'user_id' => $user->id,
            'table_id' => $data['table'],
            'order_id' => $order->id ?? null,
            'gcash_reference_id' => $hasOrder ? $data['gcash_reference_id'] : null,
            'image' => $hasOrder ? $path  : null,
            'date' => $data['date'],
            'time' => $data['time'],
            'no_people' => $data['no_people'],

        ]);
        $user->carts()->with('product')->where('cart_type', '=', CartType::BOOKING->value)->delete();

        return redirect()->route('home');
    }

}
