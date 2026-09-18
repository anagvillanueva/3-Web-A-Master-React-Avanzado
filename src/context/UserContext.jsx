import { createContext, useState, useEffect } from 'react';

// 1. Crear el contexto: es solo un "canal" vacio, todavia sin datos.
//    Cualquier componente puede suscribirse a el con useContext(UserContext).
export const UserContext = createContext();

// 2. Crear el componente proveedor (Provider): es quien realmente guarda el
//    estado (usuario) y las funciones (login/logout), y las expone a traves
//    del contexto. Todo componente que quede DENTRO de <UserProvider> en el
//    arbol (Navbar, LoginForm, etc.) podra leer ese value con useContext,
//    sin importar cuantos niveles de componentes haya en medio.
export function UserProvider({ children }){
    const [usuario, setUsuario] = useState(null);

    // Persistencia basica con localStorage al cargar el componente
    useEffect(()=>{
        const usuarioGuardado = localStorage.getItem('techstore_usuario');
        if(usuarioGuardado){
            setUsuario(JSON.parse(usuarioGuardado));
        }
    }, []);

    //Funcion para iniciar sesion 
    const login = (datosUsuario) => {
        setUsuario(datosUsuario);
        localStorage.setItem('techstore_usuario', JSON.stringify(datosUsuario));
    };

    //Funcion para cerrar sesion 
    const logout = () => {
        setUsuario(null);
        localStorage.removeItem('techstore_usuario')
    };

    return (
        <UserContext.Provider value={{ usuario, login, logout}}>
            {children}
        </UserContext.Provider>
    );

}