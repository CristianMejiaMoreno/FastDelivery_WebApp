<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TipoDocumento>
 */
class TipoDocumentoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $tiposDocumento = [
            'Cédula de ciudadanía',
            'Tarjeta de identidad',
            'Registro civil',
            'Cédula de extranjería',
            'Pasaporte',
            'NIT'
        ];

        return [
            'nombre' => $this->faker->randomElement($tiposDocumento)
        ];
    }
}
