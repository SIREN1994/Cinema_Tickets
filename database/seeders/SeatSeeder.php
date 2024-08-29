<?php

namespace Database\Seeders;

use App\Models\Seat;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class SeatSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Define the rows and seat numbers
        $rows = ['A', 'B', 'C', 'D', 'E'];
        $seatsPerRow = 5;

        // Loop through each row and seat number
        foreach ($rows as $row) {
            for ($i = 1; $i <= $seatsPerRow; $i++) {
                Seat::create([
                    'seat_id' => $row . $i,
                    'seat_state' => 'free',
                    'seat_price' => 100, // Example price, you can change this
                ]);
            }
        }
    }
}
