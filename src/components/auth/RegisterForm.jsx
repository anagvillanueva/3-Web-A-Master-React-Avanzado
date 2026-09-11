import { useForm } from 'react-hook-form';

export function RegisterForm(){
    //Inicializar useForm con valores por defecto
    // - register: conecta cada input con react-hook-form (sin manejar estado manual con useSate)
    // - handleSubmit: envuelve nuestro submit y solo lo ejecuta si pasa las validaciones
    // -formSatate.errors: objeto con los mensajes de error de cada campo que fallo su validacion

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            preferredCategoy: 'electronics',
            subscribeNewsletter: true,
            acceptTerms: false
        }
    });

    //Funcion que procesa nuestro JSON y listo para la API
    // Solo se ejecuta si TODOS los campos pasaron las reglas de validacion
    const onSubmitData = (data ) => {
        console.log('Datos estructurados listos para enviar al backend', data)
        alert("Registro exitoso, revisa la consola para visualizar el JSON")
    };

    console.log('Re-renderizando RegisterForm (Solo eventos clave)')

    const inputClass = "w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
    const labelClass = "mb-1 block text-sm font-medium text-gray-700"
    const errorClass = "mt-1 block text-sm text-red-600"

    return(
        <div className="mx-auto w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-900"> Crear Cuenta</h2>
            <p className="mt-1 mb-6 text-sm text-gray-500">Registrate para realizar compras y recibir promociones exclusivas.</p>

            {/* handleSubmit intercepta el submit nativo, valida y solo llama a onSubmitData si todo es valido*/}
            <form onSubmit={handleSubmit(onSubmitData)} className="space-y-5">

                {/*Campo 1: Nombre completo (Obligatorio) y minimo 3 caracteres */}
                <div>
                    <label className={labelClass}>Nombre completo:</label>
                    <input placeholder="Anita Gutierritos"
                    className={inputClass}
                    {...register('fullName', {
                        required: 'El nombre completo es obligatorio',
                        minLength: {
                            value:3,
                            message: 'El nombre debe tener al menos 3 caracteres'
                        }
                    })}
                    />
                    {errors.fullName && <span className={errorClass}>{errors.fullName.message}</span>}
                </div>

                 {/*Campo 2: Email (Obligatorio) validación con expresión regular */}
                <div>
                    <label className={labelClass}>Correo electronico:</label>
                    <input
                    type="email"
                    placeholder="anita@ejemplo.com"
                    className={inputClass}
                    {...register('email', {
                        required: 'El correo electronico es obligatorio',
                        pattern: {
                            value: /^[^@]+@[^@]+\.[^@]+$/,
                            message: 'Ingresa un formato de correo valido'
                        }
                    })}
                    />
                    {errors.email && <span className={errorClass}>{errors.email.message}</span>}
                </div>

                 {/*Campo 3: Contraseña (Obligatorio) minimo 8 caracteres */}
                <div>
                    <label className={labelClass}>Contraseña:</label>
                    <input
                    type="password"
                    className={inputClass}
                    {...register('password', {
                        required: 'La contraseña es requerida',
                        minLength: {
                            value:8,
                            message: 'La contraseña debe tener al menos 8 caracteres'
                        }
                    })}
                    />
                    {errors.password && <span className={errorClass}>{errors.password.message}</span>}
                </div>

                 {/*Campo 4: Categoria de interes tipo select sin validación */}
                <div>
                    <label className={labelClass}>Categoria de interes:</label>
                    <select className={inputClass} {... register('preferredCategoy')}>
                        <option value="electronics">Electronica y Gadgets</option>
                        <option value="computers">Laptops y Computacion</option>
                        <option value="gaming">Videojuegos y consolas</option>
                    </select>
                </div>

                 {/*Campo 5: Checkbox de suscripcion a Newsletter, marcarlo por default */}
                <div>
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-400" {... register('subscribeNewsletter')} />
                        Deseo recibir cupones y ofertas por correo.
                    </label>
                </div>

                 {/*Campo 6: Checbox (obligatorio) de terminos y condiciones */}
                <div>
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-400" {... register('acceptTerms',{
                            required: 'Debes aceptar los terminos y condiciones para crear tu cuenta.'
                        })} />
                        Acepto los terminos y las politicas de privacidad.
                    </label>
                    {errors.acceptTerms && <span className={errorClass}>{errors.acceptTerms.message}</span>}
                </div>

                 {/* Boton de envio (handleSubmit) */}
                <button type="submit" className="w-full rounded-lg bg-purple-600 px-4 py-2.5 font-medium text-white shadow-sm transition-colors hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-2">
                    Crear Cuenta
                </button>
            </form>
        </div>
    );
}
