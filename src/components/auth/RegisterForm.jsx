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

    return(
        <div>
            <h2> Crear Cuenta</h2>
            <p>Registrate para realizar compras y recibir promociones exclusivas.</p>

            {/* handleSubmit intercepta el submit nativo, valida y solo llama a onSubmitData si todo es valido*/}
            <form onSubmit={handleSubmit(onSubmitData)}>

                {/*Campo 1: Nombre completo (Obligatorio) y minimo 3 caracteres */}
                <div>
                    <label>Nombre completo:</label>
                    <input placeholder="Anita Gutierritos"
                    {...register('fullName', {
                        required: 'El nombre completo es obligatorio',
                        minLength: {
                            value:3,
                            message: 'El nombre debe tener al menos 3 caracteres'
                        }
                    })}
                    />
                    {errors.fullName && <span>{errors.fullName.message}</span>}                  
                </div>

                 {/*Campo 2: Email (Obligatorio) validación con expresión regular */}
                <div>
                    <label>Correo electronico:</label>
                    <input 
                    type="email"
                    placeholder="anita@ejemplo.com"
                    {...register('email', {
                        required: 'El correo electronico es obligatorio',
                        pattern: {
                            value: /^[^@]+@[^@]+\.[^@]+$/,
                            message: 'Ingresa un formato de correo valido'
                        }
                    })}
                    />
                    {errors.email && <span>{errors.email.message}</span>}                  
                </div>
                
                 {/*Campo 3: Contraseña (Obligatorio) minimo 8 caracteres */}
                <div>
                    <label>Contraseña:</label>
                    <input 
                    type="password"
                    {...register('password', {
                        required: 'La contraseña es requerida',
                        minLength: {
                            value:8,
                            message: 'La contraseña debe tener al menos 8 caracteres'
                        }
                    })}
                    />
                    {errors.password && <span>{errors.password.message}</span>}                  
                </div>

                 {/*Campo 4: Categoria de interes tipo select sin validación */}
                <div>
                    <label>Categoria de interes:</label>
                    <select {... register('preferredCategoy')}>
                        <option value="electronics">Electronica y Gadgets</option>
                        <option value="computers">Laptops y Computacion</option>
                        <option value="gaming">Videojuegos y consolas</option>
                    </select>                
                </div>

                 {/*Campo 5: Checkbox de suscripcion a Newsletter, marcarlo por default */}
                <div>
                    <label>
                        <input type="checkbox" {... register('subscribeNewsletter')} />
                        Deseo recibir cupones y ofertas por correo.
                    </label>
                </div>

                 {/*Campo 6: Checbox (obligatorio) de terminos y condiciones */}
                <div>
                    <label>
                        <input type="checkbox" {... register('acceptTerms',{
                            required: 'Debes aceptar los terminos y condiciones para crear tu cuenta.'
                        })} />
                        Acepto los terminos y las politicas de privacidad.
                    </label>
                    {errors.acceptTerms && <span>{errors.acceptTerms.message}</span>}   
                </div>

                 {/* Boton de envio (handleSubmit) */}
                <button type="submit">
                    Crear Cuenta
                </button>
            </form>
        </div>
    );
}
