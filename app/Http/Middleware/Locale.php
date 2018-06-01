<?php
namespace App\Http\Middleware;

use Closure;

class Locale
{
    public function handle($request, Closure $next)
    {
    	if (\Session::has('locale')){
    		\App::setLocale(\Session::get('locale'));
    	}
    	else{
        	\App::setLocale(\Config::get('app.fallbacklocale'));
    	}
        return $next($request);
    }
}