<?php

namespace App\Traits;

use App\Models\Auditoria;

trait bootAuditable
{
    public static function bootAuditable()
    {
        static::update(function ($model){
            $cambios = $model->getDirty();
            $original = $model->getOriginal();

            if(!empty($cambios)){
                Auditoria::create([
                    'modelo'=>get_class($model),
                    'accion'=>'actualizado',
                    'actor_id'=> auth()->id(),
                    'actor_type'=>auth()->user() ? get_class(auth()->user()) : null,
                    'valores_anteriores'=>collect($original)->only(array_keys(($cambios))),
                    'valores_nuevos'=>$cambios
                ]);
            }
        });

        static::created(function($model){
            Auditoria::create([
                'modelo'=>get_class($model),
                'accion'=>'creado',
                'actor_id'=>auth()->id(),
                'actor_type'=>auth()->user() ? get_class(auth()->user()) : null,
                'valores_nuevos'=>$model->toArray()
            ]);
        });

        static::deleted(function($model){
            Auditoria::create([
                'modelo'=>get_class($model),
                'accion'=>'eliminado',
                'actor_id'=>auth()->id(),
                'actor_type'=>auth()->user() ? get_class(auth()->user()) : null,
                'valores_anteriores'=>$model->toArray()
            ]);
        });
    }
}
