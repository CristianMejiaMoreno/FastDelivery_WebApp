<?php

namespace App\Rules;

use App\Models\Repartidores;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class RepartidorExist implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $exits = Repartidores::where('email', $value)
            ->orWhere('numero_documento', $value)
            ->exists();

        if(!$exits)
        {
            $fail ("El {$attribute} no existe en el sistema");
        }
    }
}
