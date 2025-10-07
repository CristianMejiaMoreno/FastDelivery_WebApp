<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EditarCliente extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nombre_cliente' => 'sometimes|string',
            'tipodocumento_id' => 'sometimes|integer|exists:tipo_documentos,id',
            'numero_documento' => 'sometimes|string',
            'telefono'=>'sometimes|string',
            'email'=>'sometimes|string'
        ];
    }
}
