// middleware.ts
import { verifyRequestOrigin } from "lucia";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest): Promise<NextResponse> {
	if (request.nextUrl.pathname.startsWith('/api')) {
		if (request.headers.get('authorization') === `Bearer ${process.env.ADMIN_TOKEN}`) {
			return NextResponse.next();
		} else {
			return new NextResponse('Forbidden', {
				status: 403
			});
		}
	}
	if (request.method === "GET") {
		return NextResponse.next();
	}
	const originHeader = request.headers.get("Origin");
	// NOTE: You may need to use `X-Forwarded-Host` instead
	const hostHeader = request.headers.get("Host");
	if (!originHeader || !hostHeader || !verifyRequestOrigin(originHeader, [hostHeader])) {
		return new NextResponse(null, {
			status: 403
		});
	}
	return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!static|_next|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};