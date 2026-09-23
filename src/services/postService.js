// ============================================================
// SERVICIO DE POSTS - capa que conecta React con la API REST
// ------------------------------------------------------------
// Esta capa centraliza todas las llamadas HTTP (fetch) hacia
// nuestro backend en techstore-backend/server.js. Los componentes
// (como BlogList.jsx) no llaman a fetch directamente: solo usan
// estas funciones, sin saber cómo está construida la petición.
// Esto se conoce como "separación de responsabilidades".
// ============================================================

import { typeschemaResolver } from "@hookform/resolvers/typeschema";
import { ArraySchema } from "yup";

// URL base de nuestra API REST (definida en techstore-backend/server.js)
const API_URL = 'http://localhost:4000/api/posts';

export const postService = {
    // GET /api/posts -> obtiene todas las publicaciones
    obtenerTodos: async () => {
        const respuesta = await fetch(API_URL);
        // respuesta.ok es false si el servidor respondió con un error (4xx o 5xx)
        if(!respuesta.ok) throw new Error('Error al conectar con el servidor Node.js');
        return await respuesta.json();
    },

    // POST /api/posts -> crea una nueva publicación
    // El método por defecto de fetch es GET, por eso hay que
    // indicar explícitamente 'POST' y enviar el body en JSON.
    crear: async (nuevoPost) => {
        const respuesta = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // le decimos al servidor que el body es JSON
            },
            body: JSON.stringify(nuevoPost) // convertimos el objeto JS a texto JSON
        });
        if(!respuesta.ok) throw new Error ('Error al guardar en el servidor');
        return await respuesta.json();
    },

    // DELETE /api/posts/:id -> elimina una publicación por su id
    // El id viaja como parte de la URL, tal como lo espera la
    // ruta app.delete('/api/posts/:id') del backend.
    eliminar: async (id) => {
        const respuesta = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        if(!respuesta.ok) throw new Error('Error al eliminar del servidor');
        return await respuesta.json();
    }
};
