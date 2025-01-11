<?php

namespace App\Enums;

enum UserRole: int
{
    case ADMIN = 1;
    case MANAGER = 2;
    case CASHIER = 3;

    case CUSTOMER = 4;

}
