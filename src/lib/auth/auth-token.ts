import { JWTPayload, jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';

import authConfig from './auth-config';

export function getJwtSecretKey() {
	const secret = process.env.JWT_SECRET;

	if (!secret) {
		throw new Error('Llave secreta JWT no configurada');
	}

	const enc: Uint8Array = new TextEncoder().encode(secret);
	return enc;
}

export async function verifyJwtToken(token: string): Promise<JWTPayload | null> {
	try {
		const { payload } = await jwtVerify(token, getJwtSecretKey());
		return payload;
	} catch (error) {
		throw new Error('Token inválido', { cause: error });
	}
}

export async function getUserDataCookie() {
	const cookieStore = await cookies();
	const userData = cookieStore.get('userData');
	if (userData && typeof userData.value === 'string') {
		try {
			return JSON.parse(userData.value);
		} catch (error) {
			{ throw new Error('Error parsing userData cookie', { cause: error }); }
		}
	}
	return null;
}

export async function logout() {
	const cookieStore = await cookies();
	const token = cookieStore.get('token');

	if (token) {
		try {
			cookieStore.delete('token');
		} catch (e) { throw new Error('Error deleting token', { cause: e }); }
	}

	const userData = cookieStore.get('userData');
	if (userData) {
		try {
			cookieStore.delete('userData');
			return true;
		} catch (e) { throw new Error('Error deleting userData', { cause: e }); }
	}

	return null;
}

export async function setUserDataCookie(userData: {id: number, nombre: string, cedula: string, telefono: string, ipAddress: string}) {
	const cookieStore = await cookies();

	cookieStore.set({
		name: 'userData',
		value: JSON.stringify(userData),
		path: '/',
		maxAge: authConfig.jwtExpires,
		sameSite: 'lax',
	});
}


export async function setJWT(userData: {id: number, nombre: string, cedula: string, telefono: string, ipAddress: string}) {
	const token = await new SignJWT({
		id: userData.id,
		nombre: userData.nombre,
		cedula: userData.cedula,
		telefono: userData.telefono,

	})
		.setProtectedHeader({ alg: 'HS256' })
		.setIssuedAt()
		.setExpirationTime(authConfig.jwtExpiresString)
		.sign(getJwtSecretKey());

	const cookieStore = await cookies();

	cookieStore.set({
		name: 'token',
		value: token,
		path: '/',
		maxAge: authConfig.jwtExpires,
		sameSite: 'lax',
		httpOnly: true,
	});
}
