import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const isMaintenanceMode = process.env.MAINTENANCE_MODE === 'true';

  if (!isMaintenanceMode) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  if (pathname === '/') {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = '/__maintenance_not_found';
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|api/revalidate|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)'],
};
