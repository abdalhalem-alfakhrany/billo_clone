<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        /** @var /home/abdalhalem/DEV/billo_clone/backend/app/Models/User.php @instance */
        $user = Auth::user();

        // Check if the user has the specified role
        if ($user->isCreator()) {
            return $next($request);
        }

        // Redirect or respond with an unauthorized message
        return response()->json(['message' => 'you are not authorized'], 401);
    }
}
