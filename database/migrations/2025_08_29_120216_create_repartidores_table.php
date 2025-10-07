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
        Schema::create('repartidores', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('apellido');
            $table->foreignId('tipodocumento_id')
                ->constrained('tipo_documentos')
                ->cascadeOnDelete()
                ->cascadeOnUpdate();
            $table->string('numero_documento');
            $table->string('telefono')->nullable();
            $table->string('email')->nullable();
            $table->integer('porcentaje_repartidor');
            $table->integer('porcentaje_marca');
            $table->string('password');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('repartidores');
    }
};
