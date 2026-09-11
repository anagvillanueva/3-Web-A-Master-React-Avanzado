import { useState, useEffect } from 'react';

export function useFetch(url){
    const [datos, setDatos] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() =>{
        //Funcion asincrona dentro del efecto 
        const cargarDatos = async () => {
            try{
                // Hacer la peticion 
                const respuesta = await fetch(url);
                //Validar que la respuesta sea exitosa
                if(!respuesta.ok){
                    throw new Error (`Error ${respuesta.status}: ${respuesta.statusText}`)
                }
                // Convertirlo a JSON
                const data = await respuesta.json();

                // Guardar los datos y limpiar errores 
                setDatos(data);
                setError(null); 
        } catch{
            // Si algo falla, guarda el error
            setError(error.message);
            setDatos(null);
        } finally {
            // Siempre desactivar loading 
            setLoading(false);
        }
    }; 
    //Ejecutar funcion 
    cargarDatos();
    }, [url]); // Se re ejecuta la URL si cambia 

    return { datos, loading, error};
}