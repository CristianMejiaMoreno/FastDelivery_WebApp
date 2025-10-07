<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Zona;

class ZonaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $zonas = [
            [
                'nombre' => 'Zona Norte',
                'precio_sugerido' => 20000,
            ],
            [
                'nombre' => 'Zona Centro',
                'precio_sugerido' => 12000,
            ],
            [
                'nombre' => 'Zona Sur',
                'precio_sugerido' => 15000,
            ],
        ];

        foreach ($zonas as $zona) {
            Zona::create($zona);
        }
    }
}
