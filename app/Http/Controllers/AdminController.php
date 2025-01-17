<?php

namespace App\Http\Controllers;

use App\Enums\BookingStatus;
use App\Enums\OrderStatus;
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
                        ->orWhereHas('booking', function ($query) {
                            $query->where('booking_status', "=", BookingStatus::CONFIRM->value);
                        })
                        ->whereDate('created_at', $today)
                        ->sum("total");

        $week_sales =  Order::where('payment_status', "=", PaymentStatus::PAID->value)
                ->orWhereHas('booking', function ($query) {
                    $query->where('booking_status', "=", BookingStatus::CONFIRM->value);
                })
                ->whereBetween('created_at',
                        [
                            $start_week,
                            $end_wek])
                ->sum("total");

        $month_sales = Order::where('payment_status', "=", PaymentStatus::PAID->value)
                ->orWhereHas('booking', function ($query) {
                    $query->where('booking_status', "=", BookingStatus::CONFIRM->value);
                })
                ->whereMonth("created_at", $month)
                ->sum("total");

        $year_sales = Order::where('payment_status', "=", PaymentStatus::PAID->value)
                ->orWhereHas('booking', function ($query) {
                    $query->where('booking_status', "=", BookingStatus::CONFIRM->value);
                })
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
}
