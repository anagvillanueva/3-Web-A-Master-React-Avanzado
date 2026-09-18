import { useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';

export function LoginForm(){
    const [email, setEmail] = useState('');
    const [nombre, setNombre] = useState('');

    // useContext(UserContext) nos da acceso directo al valor que expone
    // UserProvider ({ usuario, login, logout }) sin necesidad de recibirlo
    // como prop. Aqui solo extraemos "login" porque es lo unico que este
    // formulario necesita usar.
    const {login} = useContext(UserContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!email || !nombre){
            alert('Por favor completa todos los campos');
            return;
        }

        // Simulacon de respuesta exitosa del servidor 
        login({
            email: email,
            fullName: nombre, 
            role: 'cliente' 
        });
    };

    const inputClass = "w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
    const labelClass = "mb-1 block text-sm font-medium text-gray-700"

    return(
        <div className="mx-auto w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-900">Iniciar sesión</h2>
            <p className="mt-1 mb-6 text-sm text-gray-500">Ingresa tus datos para acceder a tu cuenta.</p>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className={labelClass}>Nombre Completo:</label>
                    <input
                    type="text"
                    className={inputClass}
                    value={nombre}
                    onChange={(e) => setNombre (e.target.value)}
                    placeholder='Ej. Ana Gutierritos'
                    />
                </div>

                <div>
                    <label className={labelClass}>Correo Electronico:</label>
                    <input
                    type="email"
                    className={inputClass}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='ana@ejemplo.com'
                    />
                </div>

                <button type="submit" className="w-full rounded-lg bg-purple-600 px-4 py-2.5 font-medium text-white shadow-sm transition-colors hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-2">
                    Ingresar
                </button>
            </form>
        </div>
    )
}