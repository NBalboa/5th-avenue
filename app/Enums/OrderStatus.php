<?php

namespace App\Enums;

enum OrderStatus: int
{
     case PENDING = 1;
     case CONFIRMED = 2;
     case READY = 3;
     case COMPLETED = 4;
}
