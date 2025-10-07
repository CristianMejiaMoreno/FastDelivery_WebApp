<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EditarRepartidor extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nombre'=>'sometimes|string|max:200',
            'apellido'=>'sometimes|string|max:200',
            'tipoDocumentoId'=>'sometimes|exists:tipo_documentos,id',
            'numero_documento'=>'sometimes|numeric',
            'telefono'=>'sometimes|string',
            'email'=>'sometimes|string'
        ];
    }
}
