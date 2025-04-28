import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    // Handle RSC and static requests in production
    if (request.nextUrl.search?.includes('_rsc') || 
        request.nextUrl.search?.includes('_next') ||
        request.nextUrl.pathname.includes('.')) {
        return NextResponse.next();
    }

    const session = request.cookies.get('session')?.value;
    const path = request.nextUrl.pathname;

    // For login/register pages
    if (['/login', '/register'].includes(path)) {
        if (!session) {
            return NextResponse.next();
        }
        try {
            const roleResponse = await fetch(`${request.nextUrl.origin}/api/auth/verify-role`, {
                headers: {
                    Cookie: `session=${session}`
                }
            });

            if (roleResponse.ok) {
                return NextResponse.redirect(new URL('/', request.url));
            }
        } catch (error) {
            console.error('Session verification error:', error);
        }
        return NextResponse.next();
    }

    // Check admin routes
    if (path.startsWith('/admin')) {
        console.log('1');
        
        if (!session) {            
            console.log('2');
            // return NextResponse.redirect(new URL('/login', request.url));
        }

        try {
            const roleResponse = await fetch(`${request.nextUrl.origin}/api/auth/verify-role`, {
                headers: {
                    Cookie: `session=${session}`
                }
            });
            console.log('3', roleResponse.ok);

            if (!roleResponse.ok) {
                console.log('4');
                // return NextResponse.redirect(new URL('/login', request.url));
            }

            const { role } = await roleResponse.json();
            console.log('5', role);

            if (role !== 'admin') {
                // return NextResponse.redirect(new URL('/', request.url));
            }
        } catch (error) {
            console.log('6', error);
            console.error('Role verification error:', error);
            // return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    // Protected routes that require authentication
    if (['/orders', '/profile', '/favorites'].includes(path)) {
        if (!session) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        try {
            const roleResponse = await fetch(`${request.nextUrl.origin}/api/auth/verify-role`, {
                headers: {
                    Cookie: `session=${session}`
                }
            });

            if (!roleResponse.ok) {
                return NextResponse.redirect(new URL('/login', request.url));
            }
        } catch (error) {
            console.error('Role verification error:', error);
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
    ],
}; 