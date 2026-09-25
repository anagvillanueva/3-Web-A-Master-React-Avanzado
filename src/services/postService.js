// ============================================================
// SERVICIO DE POSTS - capa que conecta React con Supabase
// ------------------------------------------------------------
// Antes esta capa hacía fetch() hacia nuestro backend propio en
// Express (techstore-backend/server.js). Ahora habla directo con
// la base de datos Postgres de Supabase usando el SDK cliente
// (supabaseClient.js), sin pasar por un servidor intermedio.
//
// Los componentes (como BlogList.jsx) siguen sin saber cómo se
// obtienen los datos: solo llaman a estas funciones. Eso sigue
// siendo "separación de responsabilidades", solo que ahora la
// implementación interna usa Supabase en vez de fetch a una API REST.
//
// Cada método de supabase-js devuelve siempre { data, error }, nunca
// lanza una excepción por sí solo. Por eso el patrón se repite en
// las 3 funciones: revisamos "error" a mano y lo convertimos en un
// throw, para que BlogList.jsx pueda seguir usando try/catch igual
// que antes.
// ============================================================

import { supabase } from './supabaseClient';

export const postService = {
    // Trae todas las filas de la tabla "posts", ordenadas por fecha de
    // creación descendente (las más nuevas primero). Equivalente al
    // antiguo GET /api/posts.
    obtenerTodos: async () => {
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw new Error(error.message);
        return data;
    },

    // Inserta una nueva fila en "posts". .select() al final le pide a
    // Supabase que nos devuelva la fila recién creada (incluyendo el id
    // y el created_at generados por la base de datos); por eso se
    // regresa data[0] y no todo el arreglo. Equivalente al antiguo
    // POST /api/posts.
    crear: async (nuevoPost) => {
        const { data, error } = await supabase
            .from('posts')
            .insert([
                {
                    titulo: nuevoPost.titulo,
                    contenido: nuevoPost.contenido,
                    autor: nuevoPost.autor
                }
            ])
            .select();

        if (error) throw new Error(error.message);
        return data[0];
    },

    // Elimina la fila cuyo id coincide con el recibido (.eq('id', id)
    // arma el equivalente a un WHERE id = ... en SQL). Equivalente al
    // antiguo DELETE /api/posts/:id.
    eliminar: async (id) => {
        const { error } = await supabase
            .from('posts')
            .delete()
            .eq('id', id);

        if (error) throw new Error(error.message);
        return true;
    }
};
