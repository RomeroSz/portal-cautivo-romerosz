/* eslint-disable @next/next/no-img-element */
import { getRandomAd, getUserData, registroAdsAction } from "@/lib/actions/project-actions";
import Image from "next/image";
import Link from "next/link";

export default async function AdsViewPage() {
    const userData = await getUserData();
    const ad: { id: number, title: string, description: string, imageUrl: string, targetUrl: string } = await getRandomAd();
    if (!ad) {
        return <div>No se encontraron anuncios.</div>;
    }
    return (
        <form action={registroAdsAction}>
            <input
                className="hidden"
                name="userId"
                defaultValue={userData.id}
                autoComplete="off"
                type="text"
            />
            <input
                className="hidden"
                name="adId"
                defaultValue={ad.id}
                autoComplete="off"
                type="text"
            />
            <input
                className="hidden"
                name="targetUrl"
                defaultValue={ad.targetUrl}
                autoComplete="off"
                type="text"
            />
            <div className="bg-white">
                <div className="h-screen">
                    <div className="relative overflow-hidden rounded-lg">
                        <div className="absolute h-screen inset-0">
                            <img
                                src={ad.imageUrl}
                                className="size-full h-screen object-cover" // Añade object-cover para asegurar que la imagen cubra el contenedor
                                alt={ad.title} // Siempre incluye un atributo alt
                            />
                        </div>
                        <button type="submit" className="relative h-screen w-full flex items-center justify-center overflow-hidden"
                            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                            <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
                                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                    <span className="block sm:inline">{ad.title}</span>
                                </h2>
                                <p className="mt-3 text-xl text-white">
                                    {ad.description}
                                </p>
                                <Link href={'https://www.google.com/'}
                                    className="mt-8 block w-full rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto"
                                >
                                    Continuar navegando, gracias
                                </Link >
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </form>

    )
}
