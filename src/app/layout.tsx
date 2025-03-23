import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from 'sonner';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    template: '%s - Portal Cautivo | Sistema de Pago por Clic',
    default: 'Portal Cautivo - Sistema de Pago por Clic',
  },
  description:
    'Portal Cautivo es una plataforma web que permite a los usuarios autenticarse antes de acceder a internet o recursos de red. Incluye un sistema de pago por clic para anunciantes, donde se paga por cada clic en anuncios mostrados en la página de inicio de sesión o después de la autenticación. Ideal para redes Wi-Fi públicas o privadas.',
  keywords: [
    'Portal Cautivo',
    'Pago por Clic',
    'Autenticación de usuarios',
    'Redes Wi-Fi',
    'Anuncios en red',
    'Banners publicitarios',
    'Publicidad en internet',
    'Sistema de pujas',
    'Anuncios online',
    'Captive Portal',
    'Gestión de anuncios',
    'Redes públicas',
    'Autenticación web',
    'Publicidad interactiva',
  ],
  authors: [
    { name: 'Víctor Romero', url: 'https://linkedin.com/in/romerovictordev' },
  ],
  creator: 'Víctor Romero',
  openGraph: {
    title: 'Portal Cautivo | Sistema de Pago por Clic',
    description:
      'Portal Cautivo es una solución innovadora para redes Wi-Fi que integra autenticación de usuarios y un sistema de pago por clic para anunciantes. Perfecto para monetizar redes públicas o privadas.',
    url: 'https://portal-cautivo-romerosz.vercel.app/',
    siteName: 'Portal Cautivo - Sistema de Pago por Clic',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@RomeroSzDev',
    title: 'Portal Cautivo - Sistema de Pago por Clic',
    description:
      'Portal Cautivo: una plataforma web para autenticación de usuarios y publicidad mediante pago por clic. Ideal para redes Wi-Fi públicas o privadas.',
  },
  robots: {
    index: true,
    follow: true,
  },
};
export const viewport = "width=device-width, initial-scale=1";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-white">
      <body className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
        {children}
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
