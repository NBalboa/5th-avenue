<?php

namespace App\Http\Controllers;

use App\Enums\BookingStatus;
use App\Enums\PaymentStatus;
use App\Enums\UserRole;
use App\Models\Booking;
use App\Models\Order;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index(Request $request)
    {
        $month = Carbon::now()->month;
        $year = Carbon::now()->year;
        $start_week = Carbon::now()->startOfWeek();
        $end_wek = Carbon::now()->endOfWeek();
        $today = Carbon::today();

        $total_customers = User::isNotDeleted()->userType(UserRole::CUSTOMER->value)->get()->count();
        $total_staffs = User::isNotDeleted()->getStaffs()->count();


        $name_date = "today";
        if($request->input('name_date')){
            $name_date = $request->input('name_date');
        }

        if($name_date === "week"){
            $total_orders = Order::
                whereBetween('created_at',
                [
                    $start_week,
                    $end_wek])
                ->count();

                $total_reservations = Booking::
                whereBetween('created_at',
                [
                    $start_week,
                    $end_wek])
                ->count();
        }
        else if($name_date === "month"){
            $total_orders = Order::whereMonth("created_at", $month)->count();
            $total_reservations = Booking::whereMonth("created_at", $month)->count();
        }
        else if($name_date === "year"){
            $total_orders = Order::whereYear('created_at', $year)->count();
            $total_reservations = Booking::whereYear('created_at', $year)->count();
        }
        else{
            $total_orders =  Order::searchByDate(Carbon::today())->count();
            $total_reservations =  Booking::searchByDate(Carbon::today())->count();
        }
        $today_sales = Order::where('payment_status', "=", PaymentStatus::PAID->value)
                        ->whereDate('created_at', $today)
                        ->sum("total");

        $week_sales =  Order::where('payment_status', "=", PaymentStatus::PAID->value)
                ->whereBetween('created_at',
                        [
                            $start_week,
                            $end_wek])
                ->sum("total");

        $month_sales = Order::where('payment_status', ">=", PaymentStatus::PAID->value)
                ->whereMonth("created_at", $month)
                ->sum("total");

        $year_sales = Order::where('payment_status', "=", PaymentStatus::PAID->value)
                ->whereYear('created_at', $year)
                ->sum("total");


        // dd(,Booking::searchByDate(Carbon::today())->get()->count());
        // dd();
        return Inertia::render("Admin/Dashboard", [
            "total_orders" => $total_orders,
            "total_customers" =>  $total_customers,
            "total_staffs" =>  $total_staffs,
            "total_reservations" => $total_reservations,
            "sales" => [
                "today" => $today_sales,
                "month" => $month_sales,
                "week" => $week_sales,
                "year" => $year_sales
            ],
            "filters" => [
                "name_date" => $name_date
            ]
        ]);
    }


    public function report (Request $request) {
        $month = Carbon::now()->month;
        $year = Carbon::now()->year;
        $start_week = Carbon::now()->startOfWeek();
        $end_wek = Carbon::now()->endOfWeek();
        $today = Carbon::today();

        $total_customers = User::isNotDeleted()->userType(UserRole::CUSTOMER->value)->get()->count();
        $total_staffs = User::isNotDeleted()->getStaffs()->count();

        $name_date = "today";
        if($request->input('name_date')){
            $name_date = $request->input('name_date');
        }

        if($name_date === "week"){
            $total_orders = Order::
                whereBetween('created_at',
                [
                    $start_week,
                    $end_wek])
                ->count();

                $total_reservations = Booking::
                whereBetween('created_at',
                [
                    $start_week,
                    $end_wek])
                ->count();
        }
        else if($name_date === "month"){
            $total_orders = Order::whereMonth("created_at", $month)->count();
            $total_reservations = Booking::whereMonth("created_at", $month)->count();
        }
        else if($name_date === "year"){
            $total_orders = Order::whereYear('created_at', $year)->count();
            $total_reservations = Booking::whereYear('created_at', $year)->count();
        }
        else{
            $total_orders =  Order::searchByDate($today)->count();
            $total_reservations =  Booking::searchByDate($today)->count();
        }

        $today_sales = Order::where('payment_status', "=", PaymentStatus::PAID->value)
                        ->whereDate('created_at', $today)
                        ->sum("total");

        $week_sales =  Order::where('payment_status', "=", PaymentStatus::PAID->value)
                ->whereBetween('created_at',
                        [
                            $start_week,
                            $end_wek])
                ->sum("total");

        $month_sales = Order::where('payment_status', ">=", PaymentStatus::PAID->value)
                ->whereMonth("created_at", $month)
                ->sum("total");

        $year_sales = Order::where('payment_status', "=", PaymentStatus::PAID->value)
                ->whereYear('created_at', $year)
                ->sum("total");


        $orders = Order::with('cashier','customer');
        $bookings = Booking::with('confirmed', 'table', 'user')
            ->where('booking_status', '=', BookingStatus::CONFIRM->value);

        if(!$name_date || $name_date === 'today'){
            $orders = $orders->whereDate("created_at",$today);
            $bookings = $bookings->whereDate('created_at', $today);
        }else if($name_date === "month"){
            $orders = $orders->whereMonth("created_at", $month);
            $bookings = $bookings->whereMonth('created_at', $month);
        }else if($name_date === "week"){
            $orders = $orders->whereBetween('created_at',
            [
                $start_week,
                $end_wek]);
                $bookings = $bookings->whereBetween('created_at',
            [
                $start_week,
                $end_wek]);
        }
        else{
            $orders = $orders->whereYear('created_at', $year);
            $bookings = $bookings->whereYear('created_at', $year);
        }


        $orders = $orders->get();
        $bookings = $bookings->get();
        $date_generated = $today->format('F d, Y');

        $logo = asset('images/logo.png');
        // $logo = 'data:image/png;base64'. base64_encode(file_get_contents($logoPath));
        // dd($logo);
        return Inertia::render('Admin/Reports', [
            "total_orders" => $total_orders,
            "total_customers" =>  $total_customers,
            "total_staffs" =>  $total_staffs,
            "total_reservations" => $total_reservations,
            "sales" => [
                "today" => $today_sales,
                "month" => $month_sales,
                "week" => $week_sales,
                "year" => $year_sales
            ],
            "sales_date" => [
                "today" => $today->format('F d, Y'),
                "month" => Carbon::now()->format('F, Y'),
                "week" => [
                    "start" => Carbon::now()->startOfWeek()->format('F d, Y'),
                    "end" => Carbon::now()->endOfWeek()->format('F d, Y')
                ],
                "year" => Carbon::now()->year
            ],
            "filters" => [
                "name_date" => $name_date
            ],
            "orders" => $orders,
            "bookings" => $bookings,
            "date_generated" => $date_generated,
            "logo" => $logo
        ]);
    }
}
