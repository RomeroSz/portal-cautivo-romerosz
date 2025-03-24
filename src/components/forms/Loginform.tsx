"use client";
import { login } from '@/lib/actions/project-actions'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { toast } from 'sonner';

export default function LoginForm() {

    const formRef = useRef<HTMLFormElement>(null)
    const router = useRouter();
    const loginFormFunction = async (formData: FormData) => {
        const loginPromise: Promise<{ redirect?: string }> = new Promise(async (resolve, reject) => {
            try {
                const loginData = await login(formData);
                resolve(loginData);
            } catch (error) {
                reject(error);
            }
        });
        toast.promise(loginPromise, {
            loading: 'Cargando...',
            success: (data: { redirect?: string }) => {
                formRef.current?.reset();
                if (data.redirect) {
                    router.push(data.redirect);
                }
                return `Usuario logueado con éxito`;
            },
            error: (error) => {
                console.log('error', error);
                if (error instanceof Error && error.message) {
                    return error.message;
                } else {
                    const errorMessage = typeof error === 'string' ? error : 'Ha ocurrido un error';
                    return errorMessage;
                }
            }
        });
    };

    return (
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div className="mx-auto w-full max-w-sm lg:w-96">
                <div>
                    <span className="sr-only">portal_cautivo</span>
                    <Image
                        src={`/svg/wifi-svgrepo-com.svg`}
                        alt="portal_cautivo"
                        className="h-20 w-auto"
                        width={100}
                        height={100} />
                    <h2 className="mt-4 text-2xl/9 font-bold tracking-tight text-gray-900">Ingrese los siguientes datos para tener acceso a internet</h2>
                </div>

                <div className="mt-5">
                    <div>
                        <form ref={formRef} action={loginFormFunction} className="space-y-6">
                            <div>
                                <label htmlFor="cedula" className="block text-sm/6 font-medium text-gray-900">
                                    Cedula
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="cedula"
                                        name="cedula"
                                        type="text"
                                        required
                                        autoComplete="cedula"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-800 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="nombre" className="block text-sm/6 font-medium text-gray-900">
                                    Nombre Completo
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="nombre"
                                        name="nombre"
                                        type="text"
                                        required
                                        autoComplete="nombre"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-800 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="telefono" className="block text-sm/6 font-medium text-gray-900">
                                    Teléfono
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="telefono"
                                        name="telefono"
                                        type="text"
                                        required
                                        autoComplete="telefono"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-800 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-sky-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-sky-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-800"
                                >
                                    Iniciar Sesión
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

