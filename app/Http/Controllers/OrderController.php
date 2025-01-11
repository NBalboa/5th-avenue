<?php

namespace App\Http\Controllers;

use App\Enums\OrderStatus;
use App\Enums\PaymentStatus;
use App\Http\Requests\OrderPaymentStatusRequest;
use App\Http\Requests\OrderStatusUpdateRequest;
use App\Http\Requests\OrderStoreRequest;
use App\Models\Category;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\Table;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index(Request $request){

        $orders = Order::where('customer_id',  '=',null);

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

        $orders = $orders->paginate(10)->withQueryString();


        return Inertia::render('Admin/Orders', [
            'orders' => $orders,
            'filters' => [
                'search' => $request->input('search'),
                'orderStatus' => $request->input('orderStatus'),
                'paymentStatus' => $request->input('paymentStatus')
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
            $products = $products->ByCategory($category);
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
            'tendered_by' => 1,
            'table_id' => $data['table'],
            'total' => $data['total'],
            'amount_render' => $data['amountRender'],
            'order_status' => OrderStatus::PENDING->value,
            'payment_status' => PaymentStatus::PAID->value
        ]);

        foreach($items as $item){
            $product = $item['product'];
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $product['id'],
                'price' => $product['price'],
                'quantity' => $item['order_quantity']
            ]);
        }

        return redirect()->route('orders.index');
    }


    public function updateOrderStatus(OrderStatusUpdateRequest $request,Order $order){
        $data = $request->validated();
        $status = (int) $data['status'];
        $order->order_status = $status;
        $order->save();


        return back();
    }

    public function updatePaymentStatus(OrderPaymentStatusRequest $request, Order $order){
        $data = $request->validated();
        $order->payment_status = (int) $data['status'];
        $order->save();

        return back();
    }

    public function items(Order $order) {
        $items = $order->items()->with('product')->get();

        return Inertia::render('Admin/OrderItems', [
            'order' => $order,
            'items' => $items
        ]);
    }
}
