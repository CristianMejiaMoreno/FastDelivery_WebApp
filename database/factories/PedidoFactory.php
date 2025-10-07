<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Pedido>
 */
class PedidoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'codigo_pedido' => now()->format('Ymd') . '-' . $this->faker->numberBetween(1, 99999999999),
            'cliente_id' => $this->faker->numberBetween(1,1000),
            'repartidor_id' => $this->faker->numberBetween(1,1000),
            'zona_id' => $this->faker->numberBetween(1,3), 
            'precio' => $this->faker->randomElement([12000, 15000, 20000]),
            'fecha_pedido' => $this->faker->dateTimeBetween('-1 week', 'now'),
            'fecha_entrega' => $this->faker->optional()->dateTimeBetween('now', '+1 week'),
            'estado' => $this->faker->randomElement([
                'pendiente',
                'asignado',
                'en camino',
                'cancelado',
                'entregado',
            ]),
            'observacion' => $this->faker->sentence(),
        ];
    }
}
