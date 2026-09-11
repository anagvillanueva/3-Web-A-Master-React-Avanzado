const { useEffect } = require("react");
const { resumeToPipeableStream } = require("react-dom/server");


// Escenario 1, sin Array - Bucles infinitos
useEffect(()=>{
    console.log('Se ejecuta en cada render.');
    fetch ('https://api.ejemplo.com/productos');
});

// Escenario 2 - Array vacio []
useEffect(()=>{
    console.log('Se ejecuta UNA sola vez al montar')
    fetch ('https://api.ejemplo.com/productos');
}, []);

// Escenario 3 - Para reaccionar a cambios 
useEffect(()=>{
    console.log('Se ejecuta cuando categoria cambia')
    fetch ('https://api.ejemplo.com/productos');
}, [categoria]);

// Regla: Si necesitas hacer fetch inicial una sola vez usamos -> [ ]

useEffect(()=>{
    // Opcion A: Funcion dentro 
    const cargarProductos = async () => {
        const respuesta = await fetch ('https://api.ejemplo.com/productos')
        const datos = await respuesta.json();
        setProductos(datos);
    };

    cargarProductos();
}, []);

// O la opcion B, Funcion fuera 
    const cargarProductos = async () => {
        try{
        const respuesta = await fetch ('https://api.ejemplo.com/productos')
        // Verificar estado HTTP
        if(!respuesta.ok){
            throw new Error(`Error: ${respuesta.status}`);        
        }
        const datos = await respuesta.json();
        setProductos(datos); 
        setError(null);
        } catch (err) {
            setError (err.message);
            setProductos([]);
        } finally {
            setLoading(false); // Siempre se ejecuta 
        }

};

useEffect(() =>{
    cargarProductos();
},[]);