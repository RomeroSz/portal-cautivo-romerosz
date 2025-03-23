import LoginForm from '@/components/forms/Loginform';
import Image from 'next/image'

export default function Login() {
    return (
        <div className="h-full bg-white">
            <div className="h-full">
                <div className="flex min-h-full flex-1">
                    <LoginForm />
                    <div className="relative hidden w-0 flex-1 lg:block">
                        <div className="absolute inset-0 h-full w-full bg-black/50 z-10" aria-hidden="true"></div>
                        <Image
                            src={`/markus-spiske-L-mHnEJXR6A-unsplash.jpg`} alt={`Imagen de fondo de pantalla`}
                            fill className="absolute inset-0 h-full w-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

