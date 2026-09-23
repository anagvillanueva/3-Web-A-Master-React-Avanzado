// ============================================================
// BlogList - componente React que consume la API REST
// ------------------------------------------------------------
// Este componente muestra cómo un frontend React consume una
// API REST propia (techstore-backend/server.js) a través del
// service layer (postService.js): lee (GET), crea (POST) y
// elimina (DELETE) publicaciones, todo mediante llamadas HTTP.
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

    // Mientras se resuelve el fetch inicial, mostramos un mensaje de carga
    if (cargando) return <p>Cargando publicaciones desde Node.js...</p>;
    // Si el fetch falló (por ejemplo, el backend no está corriendo), mostramos el error
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Blog TechStore (Servidor Node.js)</h2>

            {/* Formulario de creación: componentes controlados (value + onChange) */}
            <form onSubmit={handleSubmit}>
                <h3>Crear Nueva Publicación</h3>
                <div>
                    <label>Título:</label>
                    <input
                        type="text"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                    />
                </div>
                <div>
                    <label>Contenido:</label>
                    <textarea
                        value={contenido}
                        onChange={(e) => setContenido(e.target.value)}
                    />
                </div>
                <button type="submit">Publicar en Backend</button>
            </form>

            <hr />

            {/* Lista de publicaciones traídas del backend vía GET /api/posts */}
            <div>
                {posts.map((post) => (
                    <div key={post.id}>
                        <h4>{post.titulo}</h4>
                        <p>{post.contenido}</p>
                        <small>Autor: {post.autor}</small>
                        <br />
                        <button onClick={() => handleEliminar(post.id)}>
                            Eliminar
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
