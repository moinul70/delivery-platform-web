import { NextResponse } from 'next/server';
import useAuthStore from '@/store/authStore';

// define which roles can access which routes
const roleRoutes = {
  admin:    ['/dashboard/admin'],
  user: ['/dashboard/user'],
  driver:   ['/dashboard/driver'],
};

export function proxy(request) {
  const { pathname } = request.nextUrl;

  // get token and role from cookies
  const token = request.cookies.get('token')?.value;
  const role  = request.cookies.get('role')?.value;

 
  const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/register');
  const isDashboard = pathname.startsWith('/dashboard');

  // No token → redirect to login
  if (!token && isDashboard) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Already logged in → skip login/register page
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL(`/dashboard/${role}`, request.url));
  }

  // Role-based access control
  if (token && role && isDashboard) {
    const allowedRoutes = roleRoutes[role] || [];
    const hasAccess = allowedRoutes.some(route => pathname.startsWith(route));

    if (!hasAccess) {
      return NextResponse.redirect(new URL(`/dashboard/${role}`, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
};