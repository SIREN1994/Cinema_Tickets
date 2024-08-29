<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Seat extends Model
{
    use HasFactory;

    protected $fillable = ['seat_id', 'seat_state', 'seat_price'];



    // Tell Laravel to use 'seat_id' for route model binding
    public function getRouteKeyName()
    {
        return 'seat_id';
    }
}
