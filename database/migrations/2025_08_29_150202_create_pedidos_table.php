<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pedidos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('clienteId')
                ->constrained('clientes')
                ->cascadeOnDelete()
                ->cascadeOnUpdate();
            $table->foreignId('repartidorId')
                ->constrained('repartidores')
                ->cascadeOnDelete()
                ->cascadeOnUpdate();
            $table->foreignId('zonaId')
                ->constrained('zonas')
                ->cascadeOnDelete()
                ->cascadeOnUpdate();
            $table->decimal('precio');
            $table->date('fecha_pedido');
            $table->date('fecha_entrega')->nullable();
            $table->enum('estado',
                [
                    'pendiente',
                    'asignado',
                    'en camino', 
                    'cancelado', 
                    'entregado'
                ]
            )->default('pendiente');
            $table->text('observacion');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pedidos');
    }
};
