import Link from "next/link";
import Image from 'next/image'

export default function AccessDeniedPage() {
  return (
    <div className="relative isolate flex min-h-full flex-1 flex-col justify-center sm:px-6 lg:px-8">
      <div className="fixed top-0 right-0 inset-0 bottom-0 left-0 -z-10 bg-black/85" aria-hidden="true"></div>
      <div className="fixed top-0 right-0 inset-0 bottom-0 left-0 -z-20 h-full w-full">
        <Image
          src={`/markus-spiske-L-mHnEJXR6A-unsplash.jpg`} alt={`Imagen de fondo de pantalla`}
          fill className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8">
        <p className="text-base font-semibold leading-8 text-white">Error, Permisos Insuficientes</p>
        <h1 className="text-balance text-5xl font-semibold tracking-tight text-white sm:text-7xl">
          Acceso Denegado
        </h1>
        <p className="mt-6 text-pretty text-lg font-medium text-white/70 sm:text-xl/8">
          Lo siento, usted no tiene los permisos suficientes para acceder a esta sección
        </p>
        <div className="mt-10 flex justify-center">
          <Link href="/adsView" className="text-sm font-semibold leading-7 text-sky-100">
            <span aria-hidden="true">&larr;</span> Volver a la página principal
          </Link>
        </div>
      </div>
    </div>
  )
}
