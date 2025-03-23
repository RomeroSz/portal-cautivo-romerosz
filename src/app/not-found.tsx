import Link from "next/link";
import Image from 'next/image'

export default function NotFound() {
    return (

        <div className="grid min-h-full grid-cols-1 grid-rows-[1fr,auto,1fr] bg-white lg:grid-cols-[max(50%,36rem),1fr]">
            <header className="mx-auto w-full px-6 pt-6 sm:pt-10 lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:px-8">

                <Link href="/adsView" className="text-sm font-semibold leading-7 text-white">
                    <span className="sr-only">portal_cautivo</span>
                    <Image
                        src={`/svg/wifi-svgrepo-com.svg`}
                        alt="portal_cautivo"
                        className="h-20 w-auto sm:h-20"
                        width={100}
                        height={100} />
                </Link>
            </header>
            <main className="mx-auto w-full px-6 py-14 sm:py-20 lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:px-8">
                <div className="max-w-lg">
                    <p className="text-base/8 font-semibold text-sky-700">404</p>
                    <h1 className="mt-4 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                        Página no encontrada
                    </h1>
                    <p className="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
                        Lo sentimos, la página que estás buscando no existe.
                    </p>
                    <div className="mt-6">
                        <Link href="/adsView" className="text-sm/7 font-semibold text-sky-700">
                            <span aria-hidden="true">&larr;</span> Volver a la página principal
                        </Link>
                    </div>
                </div>
            </main>
            <footer className="self-end lg:col-span-2 lg:col-start-1 lg:row-start-3">
                <div className="border-t border-gray-100 bg-gray-50 py-10">
                    <nav className="mx-auto flex w-full  items-center gap-x-4 px-6 text-sm/7 text-gray-600 lg:px-8">
                        <p>Por favor, contacte a Soporte</p>
                        <svg viewBox="0 0 2 2" aria-hidden="true" className="h-0.5 w-0.5 fill-gray-300">
                            <circle r={1} cx={1} cy={1} />
                        </svg>
                    </nav>
                </div>
            </footer>
            <div className="hidden lg:relative lg:col-start-2 lg:row-start-1 lg:row-end-4 lg:block">
                <div className="absolute inset-0 h-full w-full bg-black/50 z-10" aria-hidden="true"></div>
                <Image
                    src={`/markus-spiske-L-mHnEJXR6A-unsplash.jpg`} alt={`Imagen de fondo de pantalla`}
                    fill className="absolute inset-0 h-full w-full object-cover"
                />
            </div>
        </div>
    )
}
