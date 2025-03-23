"use server";
import prisma from "@/db/prisma"
import { getUserDataCookie, logout, setJWT, setUserDataCookie } from "../auth/auth-token";
import { redirect } from "next/navigation"
import { headers } from "next/headers";
import ip from 'ip';
import { AdClickSchema, LoginSchema } from "@/db/validations/validationShema";

export async function logoutAction() {
    await logout()
    redirect('/')
}

export async function login(formData: FormData) {
    const headersList = await headers();
    let ipAddress = headersList.get('x-forwarded-for') ?? headersList.get('x-real-ip') ?? 'unknown';
    if (ipAddress.includes(',')) {
        ipAddress = ipAddress.split(',')[0].trim();
    }
    if (ipAddress === '::1') {
        ipAddress = '127.0.0.1';
    }
    if (!ip.isV4Format(ipAddress) && !ip.isV6Format(ipAddress)) {
        ipAddress = 'unknown';
    }
    const cedula = formData.get('cedula')?.toString() || '';
    const nombre = formData.get('nombre')?.toString() || '';
    const telefono = formData.get('telefono')?.toString() || '';
    if (!cedula || !nombre || !telefono) {
        throw new Error('Campos incompletos, por favor llene correctamente');
    }
    const loginData = LoginSchema.safeParse({ cedula, nombre, telefono, ipAddress });
    if (!loginData.success) {
        throw new Error(loginData.error.errors.map(e => e.message).join(', '));
    }
    const userData = await prisma.user.upsert({
        where: { cedula },
        update: { nombre, telefono, ipAddress },
        create: { cedula, nombre, telefono, ipAddress }
    });
    await setJWT(userData);
    setUserDataCookie(userData);
    redirect('/adsView')
}
export async function registroAdsAction(formData: FormData) {
    const headersList = await headers();
    let ipAddress = headersList.get('x-forwarded-for') ?? headersList.get('x-real-ip') ?? 'unknown';
    if (ipAddress.includes(',')) {
        ipAddress = ipAddress.split(',')[0].trim();
    }
    if (ipAddress === '::1') {
        ipAddress = '127.0.0.1';
    }
    if (!ip.isV4Format(ipAddress) && !ip.isV6Format(ipAddress)) {
        ipAddress = 'unknown';
    }
    const userId = Number(formData.get('userId')?.toString() || '0');
    const adId = Number(formData.get('adId')?.toString() || '0');
    const targetUrl = formData.get('targetUrl')?.toString() || '';
    const loginData = AdClickSchema.safeParse({ userId, adId, ipAddress });
    if (!loginData.success) {
        throw new Error(loginData.error.errors.map(e => e.message).join(', '));
    }
    await prisma.adClick.create({ data: { userId, adId, ipAddress, clickedAt: new Date() } });
    redirect(targetUrl)
}

export async function getUserData() {
    const cookieData = getUserDataCookie()
    return cookieData
}

export async function getRandomAd() {
    try {
        const randomAd = await prisma.$queryRaw`
      SELECT * FROM "Ad"
      ORDER BY RANDOM()
      LIMIT 1
    `;
        return (randomAd as { id: number, title: string, description: string, imageUrl: string, targetUrl: string }[])[0];
    } catch (error) {
        throw new Error('Error al obtener el anuncio aleatorio', { cause: error })
    }
}

export async function getAdsData() {
    try {
        const ads = await prisma.adClick.findMany({
            select: {
                id: true,
                ad: {
                    select: {
                        id: true,
                        title: true,
                        description: true,
                        imageUrl: true,
                        targetUrl: true,
                    },
                },
                user: {
                    select: {
                        nombre: true,
                        cedula: true,
                        telefono: true,
                    },
                },
                ipAddress: true,
                clickedAt: true
            },
            orderBy: { clickedAt: 'desc' },
        });
        return ads;
    } catch (error) {
        console.error('Error al obtener los anuncios:', error);
        return null;
    }
}