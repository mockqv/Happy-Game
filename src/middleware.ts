import { type MiddlewareConfig, type NextRequest, NextResponse } from "next/server";

const publicRoutes = [
    {path: /^\/$/, whenAuthenticated: 'next'}, // Rota exata da raiz
    {path: /^\/sign-in$/, whenAuthenticated: 'redirect'},
    // {path: '/register', whenAuthenticated: 'redirect'},
    {path: /^\/noticias(\/.*)?$/, whenAuthenticated: 'next'}, // Permite /noticias, /noticias/123, etc.
    {path: /^\/competicoes(\/.*)?$/, whenAuthenticated: 'next'}, // Permite /competicoes, /competicoes/abc, etc.
    {path: /^\/jogadores(\/.*)?$/, whenAuthenticated: 'next'}, // Permite /jogadores, /jogadores/xyz, etc.
    {path: /^\/sobre$/, whenAuthenticated: 'next'},
    {path: /^\/feedback$/, whenAuthenticated: 'next'},
    //{path: '/example', whenAuthenticated: 'next'}
] as const;


const REDIRECT_WHENT_NOT_AUTHENTICATED_ROUTE = '/';

export default function middleware(request: NextRequest){
    const path = request.nextUrl.pathname;
    const publicRoute = publicRoutes.find(route => route.path.test(path));
    const authToken = request.cookies.get('token');

    if(!authToken && publicRoute){
        return NextResponse.next();
    }

    if(!authToken && !publicRoute){
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = REDIRECT_WHENT_NOT_AUTHENTICATED_ROUTE;

        return NextResponse.redirect(redirectUrl);
    }

    if(authToken && publicRoute && publicRoute.whenAuthenticated === 'redirect'){
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = "/dashboard";

        return NextResponse.redirect(redirectUrl);
    } 

    if(authToken && !publicRoute){
        //JWT verification
    }

    return NextResponse.next()
}

export const config: MiddlewareConfig = {
    matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|favicon.ico).*)',
    ],
}