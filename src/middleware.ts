import { NextRequest, NextResponse } from 'next/server';
import { verifyJwtToken } from './lib/auth/auth-token';
import { authRoutes } from './lib/auth/config-routes';
import { cookies } from 'next/headers';

function matchesWildcard(path: string, pattern: string): boolean {
	if (pattern.endsWith('/*')) {
		const basePattern = pattern.slice(0, -2);
		return path.startsWith(basePattern);
	}
	return path === pattern;
}

async function deleteCookiesAndRedirect() {
	const cookieStore = await cookies();
	const token = cookieStore.get('token');

	if (token) {
		try {
			cookieStore.delete('token');
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (e) { throw new Error('Error al eliminar el token'); }
	}

	const userData = cookieStore.get('userData');
	if (userData) {
		try {
			cookieStore.delete('userData');
			return true;
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (e) { throw new Error('Error al eliminar los datos del usuario'); }
	}
	return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/`);
}

export async function middleware(request: NextRequest) {

	const requestHeaders = new Headers(request.headers);
	requestHeaders.set('x-pathname', request.nextUrl.pathname);

	if (authRoutes.some(pattern => matchesWildcard(request.nextUrl.pathname, pattern))) {
		const token = request.cookies.get('token');
		if (request.nextUrl.pathname.startsWith('/api')) {
			if (!token) {
				return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/access-denied`);
			}
		}
		if (!token) {
			return deleteCookiesAndRedirect();
		}
		try {
			const payload = await verifyJwtToken(token.value);
			if (!payload) {
				return deleteCookiesAndRedirect();
			}
		} catch (error) {
			console.error(error);
			return deleteCookiesAndRedirect();
		}
	}
	let redirectToApp = false;
	if (request.nextUrl.pathname === '/') {
		const token = request.cookies.get('token');
		if (token) {
			try {
				const payload = await verifyJwtToken(token.value);
				if (payload) {
					redirectToApp = true;
				} else {
					return deleteCookiesAndRedirect();
				}
			} catch (error) {
				console.error(error);
				return deleteCookiesAndRedirect();
			}
		}
	}
	if (redirectToApp) {
		return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/adsView`);
	} else {
		return NextResponse.next(
			{ request: { headers: requestHeaders } }
		);
	}
}
