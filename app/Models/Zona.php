<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Zona extends Model
{
    protected $fillable = ['nombre', 'precio_sugerido'];

    public function pedido()
    {
        return  $this->hasMany(Pedido::class, 'zona_id');
    }
}
