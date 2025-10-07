<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Ventas>
 */
class VentasFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'pedido_id' => $this->faker->numberBetween(1, 100000),
            'monto' => $this->faker->randomFloat(2, 10000, 50000), 
            'metodo_pago' => $this->faker->randomElement(['efectivo', 'transferencia', 'nequi']),
            'estado' => $this->faker->randomElement(['pendiente', 'pago']),
            'fecha_pago' => $this->faker->dateTimeBetween('-1 month', 'now'),
            'observacion' => $this->faker->sentence(),
        ];
    }
}
