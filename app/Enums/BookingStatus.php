<?php

namespace App\Enums;

enum BookingStatus: int
{
    case PENDING = 1;
    case CONFIRM = 2;
}
