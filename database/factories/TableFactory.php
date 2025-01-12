<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Table>
 */
class TableFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

     private static $counter = 1;
    public function definition(): array
    {
        return [
            "no" => $this->incrementId(),
            'name'=> $this->faker->name()
        ];
    }

    protected function incrementId(){
        return self::$counter++;
    }
}
