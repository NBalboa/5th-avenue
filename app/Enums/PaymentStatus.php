<?php

namespace App\Enums;

enum PaymentStatus: int
{
    case PENDING = 1;
    case PAID = 2;
}
