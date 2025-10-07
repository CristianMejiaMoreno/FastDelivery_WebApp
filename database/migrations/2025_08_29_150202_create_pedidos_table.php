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
            $table->string('codigo_pedido')->unique();
            $table->foreignId('cliente_id')
                ->constrained('clientes')
                ->cascadeOnDelete()
                ->cascadeOnUpdate();
            $table->foreignId('repartidor_id')
                ->constrained('repartidores')
                ->cascadeOnDelete()
                ->cascadeOnUpdate();
            $table->foreignId('zona_id')
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
            $table->integer('porcentaje_marca');
            $table->integer('porcentaje_mensajero');
            $table->decimal('recaudo_mensajero');
            $table->decimal('recaudo_empresa');
            $table->decimal('total_mensajero');
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
