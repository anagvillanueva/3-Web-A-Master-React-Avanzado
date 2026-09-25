import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

export function Navbar({vistaActual, setVistaActual}) {
    // useContext(UserContext) conecta este componente con el estado global
    // de usuario que vive en UserProvider (src/context/UserContext.jsx).
    // Como Navbar esta dentro de <UserProvider> (ver App.jsx), React le
    // entrega el valor actual de { usuario, login, logout } sin que nadie
    // tenga que pasarlo como prop. Si usuario cambia (login/logout), este
    // componente se vuelve a renderizar automaticamente con el valor nuevo.
    const {usuario, logout} = useContext(UserContext);

    const botonBaseClass = "rounded-lg px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-2";
    const botonSecundarioClass = `${botonBaseClass} text-gray-700 hover:bg-gray-100`;
    const botonPrimarioClass = `${botonBaseClass} bg-purple-600 text-white shadow-sm hover:bg-purple-700`;

    return (
        <nav className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 bg-white px-6 py-4">
            <div className="flex items-center gap-3">
                <span className="text-xl font-semibold text-gray-900">TechStore</span>
                {usuario && (
                    <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">
                        Bienvenido, {usuario.fullName}
                    </span>
                )}
            </div>

            <div className="flex items-center gap-2">
                <button
                    className={vistaActual === 'catalogo' ? botonPrimarioClass : botonSecundarioClass}
                    onClick={() => setVistaActual('catalogo')}
                >
                    Catalogo
                </button>

                {/* Muestra BlogList, que ahora obtiene sus datos de Supabase */}
                <button
                    className={vistaActual=== 'blog' ? botonBaseClass : botonSecundarioClass}
                    onClick={() => setVistaActual('blog')}
                >
                    Blog
                </button>

                {!usuario ? (
                    <>
                    <button
                        className={vistaActual === 'registro' ? botonPrimarioClass : botonSecundarioClass}
                        onClick={() => setVistaActual('registro')}
                    >
                        Registro
                    </button>

                    <button
                        className={vistaActual === 'login' ? botonPrimarioClass : botonSecundarioClass}
                        onClick={() => setVistaActual('login')}
                    >
                        Login
                    </button>
                    </>
                ):(
                    <button className={botonSecundarioClass} onClick={logout}>
                        Cerrar Sesión
                    </button>
                )}
            </div>
        </nav>
    );
}