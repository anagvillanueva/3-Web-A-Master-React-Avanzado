// ============================================================
// BlogList - componente React conectado a Supabase
// ------------------------------------------------------------
// Este componente no habla con Supabase directamente: usa el
// service layer (postService.js), que internamente hace las
// consultas a la tabla "posts" con el cliente de supabaseClient.js.
// Así, BlogList solo se preocupa de UI y estado (leer, crear y
// eliminar publicaciones), sin saber que por debajo ya no hay un
// servidor Express (techstore-backend) sino Supabase.
// ============================================================

import { useState, useEffect } from 'react';
import { postService } from '../../services/postService';

export function BlogList() {
    const [posts, setPosts] = useState([]); // lista de publicaciones traídas del backend
    const [titulo, setTitulo] = useState(''); // valor controlado del input "Título"
    const [contenido, setContenido] = useState(''); // valor controlado del textarea "Contenido"
    const [cargando, setCargando] = useState(true); // true mientras esperamos la respuesta del GET
    const [error, setError] = useState(null); // guarda el mensaje de error si algo falla

    // Pide al backend la lista actualizada de publicaciones (GET /api/posts)
    const cargarPosts = async () => {
        try {
            setCargando(true);
            const datos = await postService.obtenerTodos();
            setPosts(datos);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setCargando(false);
        }
    };

    // useEffect con arreglo de dependencias vacío ([]) = se ejecuta
    // una sola vez, cuando el componente se monta. Así cargamos los
    // datos iniciales del blog apenas se muestra en pantalla.
    useEffect(() => {
        cargarPosts();
    }, []);

    // Envía una nueva publicación al backend (POST /api/posts)
    const handleSubmit = async (e) => {
        e.preventDefault(); // evita que el formulario recargue la página
        if (!titulo || !contenido) return alert('Completa los campos');

        try {
            await postService.crear({ titulo, contenido, autor: 'Profesor' });
            setTitulo('');
            setContenido('');
            cargarPosts(); // Recargar lista para ver el post recién creado
        } catch (err) {
            alert(err.message);
        }
    };

    // Elimina una publicación existente (DELETE /api/posts/:id)
    const handleEliminar = async (id) => {
        try {
            await postService.eliminar(id);
            cargarPosts(); // Recargar lista
        } catch (err) {
            alert(err.message);
        }
    };

    const inputClass = "w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200";
    const labelClass = "mb-1 block text-sm font-medium text-gray-700";

    // Mientras se resuelve el fetch inicial, mostramos un mensaje de carga
    if (cargando) {
        return (
            <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 px-6 py-16 text-center">
                <h2 className="text-2xl font-semibold text-gray-900">Blog TechStore</h2>
                <p className="text-sm text-gray-500">Cargando publicaciones...</p>
            </div>
        );
    }
    // Si el fetch falló (por ejemplo, el backend no está corriendo), mostramos el error
    if (error) {
        return (
            <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 px-6 py-16 text-center">
                <h2 className="text-2xl font-semibold text-gray-900">Blog TechStore</h2>
                <p className="text-sm text-red-600">Error al cargar las publicaciones: {error}</p>
                <button
                    onClick={cargarPosts}
                    className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-2"
                >
                    Reintentar
                </button>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-3xl px-6 py-10">
            <div className="mb-6 text-left">
                <h2 className="text-2xl font-semibold text-gray-900">Blog TechStore (Servidor Node.js)</h2>
                <p className="text-sm text-gray-500">Total de publicaciones: {posts?.length || 0}</p>
            </div>

            {/* Formulario de creación: componentes controlados (value + onChange) */}
            <form onSubmit={handleSubmit} className="mb-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
                <h3 className="mb-5 text-lg font-semibold text-gray-900">Crear Nueva Publicación</h3>
                <div className="space-y-5">
                    <div>
                        <label className={labelClass}>Título:</label>
                        <input
                            type="text"
                            className={inputClass}
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            placeholder="Ej. Novedades de la tienda"
                        />
                    </div>
                    <div>
                        <label className={labelClass}>Contenido:</label>
                        <textarea
                            className={`${inputClass} min-h-28 resize-y`}
                            value={contenido}
                            onChange={(e) => setContenido(e.target.value)}
                            placeholder="Escribe el contenido de la publicación"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full rounded-lg bg-purple-600 px-4 py-2.5 font-medium text-white shadow-sm transition-colors hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-2"
                    >
                        Publicar en Backend
                    </button>
                </div>
            </form>

            {/* Lista de publicaciones traídas del backend vía GET /api/posts */}
            <div className="space-y-4">
                {posts.map((post) => (
                    <div
                        key={post.id}
                        className="flex flex-col gap-2 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-lg"
                    >
                        <h4 className="text-base font-semibold text-gray-900">{post.titulo}</h4>
                        <p className="text-sm text-gray-500">{post.contenido}</p>
                        <div className="mt-2 flex items-center justify-between">
                            <span className="w-fit rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-700">
                                Autor: {post.autor}
                            </span>
                            <button
                                onClick={() => handleEliminar(post.id)}
                                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-2"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
