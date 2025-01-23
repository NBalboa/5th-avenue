<?php

namespace App\Http\Controllers;

use App\Enums\BookingStatus;
use App\Enums\OrderStatus;
use App\Enums\OrderType;
use App\Enums\PaymentStatus;
use App\Http\Requests\OrderBuyNowRequest;
use App\Http\Requests\OrderPaymentStatusRequest;
use App\Http\Requests\OrderStatusUpdateRequest;
use App\Http\Requests\OrderStoreRequest;
use App\Models\Category;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\Stock;
use App\Models\Table;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index(Request $request){

        $orders = Order::with('table')->where('customer_id',  '=',null)
            ->where('order_type', '=', OrderType::ORDER->value);

        if($request->input('search')){
            $search = $request->input('search');
            $orders = $orders->search($search);
        }

        if($request->input('orderStatus')){
            $orderStatus = (int) $request->input('orderStatus');
            $orders = $orders->orderStatus($orderStatus);
        }

        if($request->input('paymentStatus')){
            $paymentStatus = (int) $request->input('paymentStatus');
            $orders = $orders->paymentStatus($paymentStatus);
        }

        $orders = $orders->latest()->paginate(10)->withQueryString();

        return Inertia::render('Admin/Orders', [
            'orders' => $orders,
            'filters' => [
                'search' => $request->input('search'),
                'orderStatus' => $request->input('orderStatus'),
                'paymentStatus' => $request->input('paymentStatus')
            ]
        ]);
    }



    public function online(Request $request){
        $orders = Order::with('customer', 'table', 'booking')
            ->where('customer_id',  '!=',null)
            ->where('order_type', '=', OrderType::ORDER->value)
            ->orWhereHas('booking', function($query) {
                $query->where('booking_status', '=', BookingStatus::CONFIRM->value);
            });

        if($request->input('search')){
            $search = $request->input('search');
            $orders = $orders->search($search)
                ->orWhereHas('customer', function($query) use($search) {
                    $query->searchByName($search);
                });
        }

        if($request->input('orderStatus')){
            $orderStatus = (int) $request->input('orderStatus');
            $orders = $orders->orderStatus($orderStatus);
        }

        if($request->input('paymentStatus')){
            $paymentStatus = (int) $request->input('paymentStatus');
            $orders = $orders->paymentStatus($paymentStatus);
        }
        $orders = $orders->latest()->paginate(10)->withQueryString();
        return Inertia::render('Admin/OnlineOrder', [
            'orders' => $orders,
            'filters' => [
                'search' => $request->input('search'),
                'category' => $request->input('category')
            ]
        ]);
    }


    public function create(Request $request) {

        $products = Product::with('category');
        $tables = Table::get();
        $categories = Category::isNotDeleted()->get();

        if($request->input('search')){
            $search = $request->input('search');
            $products = $products->search($search);
        }

        if($request->input('category')){
            $category = (int) $request->input('category');
            $products = $products->with('table')->ByCategory($category);
        }


        $products = $products->isAvailable()->isNotDeleted()->paginate(10)->withQueryString();

        return Inertia::render('Admin/OrdersCreate', [
            'products' => $products,
            'tables' => $tables,
            'categories' => $categories,
            'filters' => [
                'search' => $request->input('search'),
                'category' => $request->input('category')
            ]
        ]);
    }

    public function store(OrderStoreRequest $request){
        $data = $request->validated();
        $items = $data['orders'];

        $order = Order::create([
            'tendered_by' => Auth::user()->id,
            'table_id' => $data['table'],
            'total' => $data['total'],
            'amount_render' => $data['amountRender'],
            'order_status' => OrderStatus::PENDING->value,
            'payment_status' => PaymentStatus::PAID->value
        ]);

        foreach($items as $item){
            $product = $item['product'];

            if($product['quantity'] !== null && $product['quantity']  >= $item['order_quantity']){
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $product['id'],
                    'price' => $product['price'],
                    'quantity' => $item['order_quantity']
                ]);

                Product::getProductById((int)$product['id'])->decrement('quantity', $item['order_quantity']);
                Stock::create([
                    'product_id' => $product['id'],
                    'quantity' =>  $item['order_quantity'],
                    'description' => "Sale"
                ]);
            }

        }
        return redirect()->route('orders.index');
    }


    public function updateOrderStatus(OrderStatusUpdateRequest $request,Order $order){
        $data = $request->validated();
        $status = (int) $data['status'];
        $order->order_status = $status;

        if($status === OrderStatus::CONFIRMED->value && !$order->tendered_by){
            $order->tendered_by = Auth::user()->id;
            $items = $order->items()->get();

            foreach ($items as $item){
                $item->load('product');
                if($item->product->quantity !== null && $item->product->quantity >= $item->quantity){
                    Product::getProductById($item->product_id)->decrement('quantity', $item->quantity);
                    Stock::create([
                        'product_id' => $item->product_id,
                        'quantity' =>  $item->quantity,
                        'description' => "Sale"
                    ]);
                }
            }
        }
        $order->save();

        return back();
    }

    public function buy(OrderBuyNowRequest $request, Product $product){

        $data = $request->validated();
        $order = Order::create([
            'customer_id' => Auth::user()->id,
            'table_id' => $data['table'],
            'total' => $data['quantity'] * $product->price,
            'order_status' => OrderStatus::PENDING->value,
            'payment_status' => PaymentStatus::PENDING->value
        ]);

        OrderItem::create([
            'order_id' => $order->id,
            'product_id' => $product->id,
            'price' => $product->price,
            'quantity' => $data['quantity']
        ]);

        return redirect()->route('users.orders');
    }

    public function updatePaymentStatus(OrderPaymentStatusRequest $request, Order $order){
        $data = $request->validated();
        $order->payment_status = (int) $data['status'];
        $order->save();

        return back();
    }

    public function items(Order $order) {
        $items = $order->load('customer', 'cashier', 'booking')->items()->with('product')->get();

        return Inertia::render('Admin/OrderItems', [
            'order' => $order,
            'items' => $items
        ]);
    }
}
