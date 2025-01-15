<?php

namespace App\Enums;

enum ByQuantityType: int
{
    case HIGHEST_TO_LOWEST = 1;
    case LOWEST_TO_HIGHEST = 2;
}
