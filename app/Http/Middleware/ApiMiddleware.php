<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ApiMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();
        $token = $user?->currentAccessToken();

        if($token && $token->created_at->lt(now()->subHours(2))){
            $token->delete();
            return response()->json([
                'message' => 'Token expirado, vuelve a iniciar sesión.'
            ], 401);
        }else if(!$token){
            return response()->json([
                'message'=> 'No has iniciado aun sesion'
            ], 401);
        }



        return $next($request);
    }
}
