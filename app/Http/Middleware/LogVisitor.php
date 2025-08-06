<?php

namespace App\Http\Middleware;

use App\Models\Visitor;
use Closure;
use Illuminate\Http\Request;
use Jenssegers\Agent\Agent;
use Symfony\Component\HttpFoundation\Response;

class LogVisitor
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!session()->has('visitor_logged')) {
            $agent = new Agent();

            Visitor::create([
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'browser' => $agent->browser(),
                'os' => $agent->platform(),
                'device' => $agent->device(),
                'country' => optional(geoip($request->ip()))->country ?? 'Unknown',
                'city' => optional(geoip($request->ip()))->city ?? 'Unknown',
                'referrer' => $request->headers->get('referer'),
                'url' => $request->fullUrl(),
            ]);

            session()->put('visitor_logged', true);
        }

        return $next($request);
    }
}
