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
        Schema::create('ventas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pedidoId')
                ->constrained('pedidos')
                ->cascadeOnDelete()
                ->cascadeOnUpdate();
            $table->decimal('monto');
            $table->enum('metodo_pago', ['efectivo', 'transferencia', 'nequi']);
            $table->enum('estado', ['pendiente', 'pago']);
            $table->date('fecha_pago');
            $table->text('observacion');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ventas');
    }
};
