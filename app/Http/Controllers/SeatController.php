<?php

namespace App\Http\Controllers;

use App\Models\Seat;
use Illuminate\Http\Request;

class SeatController extends Controller
{
    // Method to return all seats
    public function index(Request $request)
    {
        return response()->json(Seat::all());
    }

    // Method to handle seat purchase
    public function purchase(Seat $seat)
    {
        $seat->update(['seat_state' => 'occupied']);
        return response()->json(['message' => 'Selected seat is successfully purchased', 'Your Seat Number : ']);
    }

    // Method to handle seat cancellation
    public function cancel(Request $request, Seat $seat)
    {
        $password = $request->input('password');
        if ($password === 'cancel') {
            $seat->update(['seat_state' => 'free']); // Fixed typo
            return response()->json(['message' => 'Selected seat is successfully canceled']);
        } else {
            return response()->json(['message' => 'Password is wrong, try again'], 403);
        }
    }
}
