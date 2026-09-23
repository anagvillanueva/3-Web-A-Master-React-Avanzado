// ============================================================
// SERVIDOR BACKEND - API REST con Node.js + Express
// ------------------------------------------------------------
// Este archivo define una API REST: un conjunto de endpoints
// (URLs + método HTTP) que el frontend (React) puede consumir
// para leer, crear y eliminar publicaciones del blog.
//
// REST se basa en usar los verbos HTTP para expresar la acción:
//   GET    -> leer / consultar información
//   POST   -> crear un nuevo recurso
//   PUT/PATCH -> actualizar un recurso existente
//   DELETE -> eliminar un recurso
// ============================================================

import express from 'express';
import cors from 'cors'; // Usamos esta libreria porque sin ella los navegadores bloquean las peticiones que ocurren entre diferentes puertos

const app = express();
const PUERTO = 4000;

// ------------------------------------------------------------
// Middlewares: funciones que se ejecutan ANTES de llegar a las
// rutas, y que pueden modificar/leer la petición (req) o la
// respuesta (res).
// ------------------------------------------------------------
app.use(cors()); // Permitir peticiones desde nuestro front (react)
app.use(express.json()); // Permitir recibir datos en formato JSON en el body

// ------------------------------------------------------------
// "Base de datos" simulada
// En una API real esto vendría de una base de datos (MySQL,
// MongoDB, etc). Aquí usamos un simple arreglo en memoria para
// enfocarnos en cómo funciona la API REST, sin la complejidad
// de configurar una base de datos.
// Importante: al reiniciar el servidor, estos datos se resetean.
// ------------------------------------------------------------
let publicaciones = [
    { id: 1, titulo: 'Bienvenido a TechStore', contenido: 'Nuestra primera publicación', autor: 'Admin'},
    { id: 2, titulo: 'Novedades en la Moda', contenido: 'Aprende stylear con maximalismo mexicano', autor: 'Bruno'},
    { id: 3, titulo: 'Los mejores laptops de 2026', contenido: 'Comparativa de las laptops más potentes del año', autor: 'Carla'},
    { id: 4, titulo: 'Cómo elegir tu primer smartphone', contenido: 'Guía para principiantes en el mundo móvil', autor: 'Admin'},
    { id: 5, titulo: 'Auriculares inalámbricos: top 5', contenido: 'Los mejores audífonos bluetooth del mercado', autor: 'Bruno'},
    { id: 6, titulo: 'Tendencias en moda urbana', contenido: 'El streetwear sigue dominando las calles', autor: 'Fernanda'},
    { id: 7, titulo: 'Videojuegos más esperados', contenido: 'Los lanzamientos que no te puedes perder', autor: 'Diego'},
    { id: 8, titulo: 'Consejos para cuidar tu laptop', contenido: 'Mantenimiento básico para alargar su vida útil', autor: 'Carla'},
    { id: 9, titulo: 'Relojes inteligentes en 2026', contenido: 'Comparativa entre los smartwatches más populares', autor: 'Admin'},
    { id: 10, titulo: 'Accesorios imprescindibles', contenido: 'Fundas, cargadores y más para tu día a día', autor: 'Bruno'},
    { id: 11, titulo: 'Moda sostenible', contenido: 'Marcas que están cambiando la industria textil', autor: 'Fernanda'},
    { id: 12, titulo: 'Cámaras para principiantes', contenido: 'Las mejores opciones para iniciar en fotografía', autor: 'Diego'},
    { id: 13, titulo: 'El auge de la inteligencia artificial', contenido: 'Cómo la IA está cambiando la tecnología cotidiana', autor: 'Admin'},
    { id: 14, titulo: 'Zapatillas más vendidas', contenido: 'Ranking de las sneakers favoritas del 2026', autor: 'Fernanda'},
    { id: 15, titulo: 'Guía de teclados mecánicos', contenido: 'Todo lo que debes saber antes de comprar uno', autor: 'Carla'},
    { id: 16, titulo: 'Consolas vs PC gaming', contenido: 'Ventajas y desventajas de cada plataforma', autor: 'Diego'},
    { id: 17, titulo: 'Estilo minimalista', contenido: 'Menos es más en la moda actual', autor: 'Bruno'},
    { id: 18, titulo: 'Monitores para diseñadores', contenido: 'Las mejores pantallas para trabajo creativo', autor: 'Carla'},
    { id: 19, titulo: 'Tips de seguridad digital', contenido: 'Protege tus dispositivos de amenazas comunes', autor: 'Admin'},
    { id: 20, titulo: 'Colores de temporada', contenido: 'La paleta que dominará la moda este año', autor: 'Fernanda'},
    { id: 21, titulo: 'Drones para principiantes', contenido: 'Guía de compra para tu primer dron', autor: 'Diego'},
    { id: 22, titulo: 'Impresoras 3D en el hogar', contenido: 'Cómo empezar a crear tus propios diseños', autor: 'Carla'},
    { id: 23, titulo: 'Bolsos y mochilas tech', contenido: 'Combina estilo y funcionalidad', autor: 'Bruno'},
    { id: 24, titulo: 'Streaming: mejores plataformas', contenido: 'Comparativa de servicios de streaming en 2026', autor: 'Admin'},
    { id: 25, titulo: 'Ropa deportiva de alto rendimiento', contenido: 'Las mejores marcas para entrenar', autor: 'Fernanda'},
    { id: 26, titulo: 'Cargadores rápidos', contenido: 'Todo sobre la nueva tecnología de carga', autor: 'Diego'},
    { id: 27, titulo: 'Accesorios para gamers', contenido: 'Sillas, mouse y teclados para mejorar tu setup', autor: 'Carla'},
    { id: 28, titulo: 'Joyería minimalista', contenido: 'Piezas sencillas que marcan tendencia', autor: 'Bruno'},
    { id: 29, titulo: 'El futuro de los wearables', contenido: 'Dispositivos que se integran a tu vida diaria', autor: 'Admin'},
    { id: 30, titulo: 'Outfits para el regreso a clases', contenido: 'Ideas de looks cómodos y a la moda', autor: 'Fernanda'}
]

// ------------------------------------------------------------
// 1. GET /api/posts -> devuelve TODAS las publicaciones
// Es el endpoint que usa BlogList.jsx al montarse para llenar
// la lista del blog. No recibe datos del cliente, solo responde.
// ------------------------------------------------------------
app.get('/api/posts', (req, res) =>{
    res.json(publicaciones)
})

// ------------------------------------------------------------
// 2. GET /api/posts/:id -> devuelve UNA publicación por su id
// ":id" es un parámetro de ruta: Express lo captura y lo expone
// en req.params.id (siempre llega como texto, por eso parseInt).
// ------------------------------------------------------------
app.get('/api/posts/:id', (req, res) =>{
    const id = parseInt(req.params.id);
    const post = publicaciones.find((p) => p.id === id);

    // Si no existe, respondemos con el código HTTP 404 (No encontrado)
    if(!post) {
        return res.status(404).json({mensaje: 'Publicación no encontrada'});
    }
    res.json(post);
})

// ------------------------------------------------------------
// 3. POST /api/posts -> crea una nueva publicación
// Los datos enviados por el cliente (frontend) llegan en
// req.body gracias al middleware express.json() de arriba.
// ------------------------------------------------------------
app.post('/api/posts', (req, res) =>{
    const { titulo, contenido, autor} = req.body;

    // Validación básica: si faltan campos obligatorios,
    // respondemos 400 (Bad Request) sin llegar a crear nada.
    if(!titulo|| !contenido){
        return res.status(400).json({ mensaje: 'El titulo y el contenido son obligatorios'});
    }

    const nuevoPost = {
        id: publicaciones.length + 1,
        titulo,
        contenido,
        autor: autor || 'Anonimo'
    };

    publicaciones.push(nuevoPost)
    // 201 (Created) es el código HTTP estándar para "recurso creado con éxito"
    res.status(201).json({ mensaje: 'Publicacion creada exitosamente', post:  nuevoPost})
})

// ------------------------------------------------------------
// 4. DELETE /api/posts/:id -> elimina una publicación por su id
// findIndex nos da la posición dentro del arreglo para poder
// quitarla con splice; find() no serviría aquí porque splice
// necesita un índice numérico, no el objeto.
// ------------------------------------------------------------
app.delete('/api/posts/:id', (req, res) =>{
    const id = parseInt(req.params.id);
    const indice = publicaciones.findIndex((p) => p.id === id);

    if(indice === -1) {
        return res.status(404).json({mensaje: 'Publicación no encontrada para eliminar'});
    }

    publicaciones.splice(indice,1)
    res.json({ mensaje: `Publicacion con ID ${id} eliminada correctamente`});
})

// Iniciar nuestro servidor
app.listen(PUERTO, () =>{
    console.log(`Servidor Node.js ejecutandose en http://localhost:${PUERTO}`)
})
