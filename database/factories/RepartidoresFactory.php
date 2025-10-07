<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Repartidores>
 */
class RepartidoresFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nombre'=>$this->faker->name(),
            'apellido'=>$this->faker->lastName(),
            'tipodocumento_id'=>$this->faker->numberBetween(1,6),
            'numero_documento'=>$this->faker->unique()->numerify(str_repeat('#', 12)),
            'telefono'=>$this->faker->phoneNumber(),
            'email'=>$this->faker->email()
        ];
    }
}
