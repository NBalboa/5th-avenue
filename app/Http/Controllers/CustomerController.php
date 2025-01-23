<?php

namespace App\Http\Controllers;

use App\Enums\UserRole;
use App\Http\Requests\CustomerStoreRequest;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Illuminate\Support\Str;

class CustomerController extends Controller
{
    public function create()
    {
        return Inertia::render("Register");
    }

    public function bookings(Request $request){
        $user_id = Auth::user()->id;
        $user = User::getUserById($user_id)->first();
        $bookings = $user->bookings()->with('table');

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
        $bookings = $bookings->latest()->get()->map(function ($booking) {
            $time = Carbon::parse($booking->time)->format('H:i:s');
            $date = Carbon::parse($booking->date)->format('Y-m-d');
            $dateTime = Carbon::createFromFormat('Y-m-d H:i:s', "$date $time");
            $booking->closing_date = $dateTime->addHours(3)->format('F j, Y g:i A');
            return $booking;
        });

        $datetimeLocalValue = $date . 'T' . substr($time, 0, 5); // "2025-01-15T14:10"

        return Inertia::render('MyBookings', [
            "bookings" => $bookings,
            'filters' => [
                'search' => $search,
                'booking' => $booking,
                'dateTimeLocalValue' => $datetimeLocalValue
            ],
        ]);
    }

    public function store(CustomerStoreRequest $request){
        $data = $request->validated();


        if ($request->hasFile('image')) {
            $idPicturePath = $request->file('image')->store('idpicture/images', 'public');
        }

        User::create([
            'image' => $idPicturePath,
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'middle_name' => $data['middle_name'],
            'email' => $data['email'],
            'phone' => $data['phone'],
            'password' => Hash::make($data['password']),
            'role' => UserRole::CUSTOMER->value,
            'remember_token' => Str::random(10),
        ]);


        return redirect()->route('login');
    }
}
