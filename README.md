# TechStore

Proyecto de práctica en React + Vite que simula el frontend de una tienda en línea con blog. Sirve como ejercicio para aprender: consumo de APIs externas, manejo de estado con Context API, formularios controlados, estilos con Tailwind CSS y, más recientemente, conexión directa a una base de datos con **Supabase**.

## Stack

- **React 19 + Vite** — UI y entorno de desarrollo.
- **Tailwind CSS** (vía `@tailwindcss/vite`) — estilos utilitarios, usados directamente en el `className` de cada componente (no hay archivos `.css` por componente).
- **Supabase** (`@supabase/supabase-js`) — base de datos Postgres + API para las publicaciones del blog.
- **techstore-backend** — servidor Express que se usaba antes para el blog (ver sección "Backend heredado" más abajo).

## Estructura de carpetas

```
src/
├── App.jsx              # Componente raíz: define las vistas (catálogo, blog, login, registro) y el ruteo simple por estado
├── main.jsx              # Punto de entrada de React (monta <App /> en el DOM)
├── index.css / App.css   # Estilos globales y variables de tema
│
├── components/
│   ├── Navbar.jsx         # Barra de navegación; cambia la vista activa
│   ├── auth/
│   │   ├── LoginForm.jsx    # Formulario de inicio de sesión (usa UserContext)
│   │   └── RegisterForm.jsx # Formulario de registro
│   ├── products/
│   │   ├── ProductList.jsx  # Lista el catálogo consumiendo la Fake Store API (useFetch + productService)
│   │   └── ProductCard.jsx  # Tarjeta individual de producto
│   └── posts/
│       └── BlogList.jsx     # Lista, crea y elimina publicaciones del blog usando postService (Supabase)
│
├── context/
│   └── UserContext.jsx    # Estado global del usuario (login/logout), persistido en localStorage
│
├── hooks/
│   └── useFetch.js        # Hook genérico para hacer fetch a una URL y manejar loading/error/datos
│
└── services/
    ├── productService.js    # Construye las URLs de la Fake Store API (catálogo de productos)
    ├── postService.js       # CRUD de publicaciones del blog contra Supabase (tabla "posts")
    └── supabaseClient.js    # Crea y exporta la instancia única del cliente de Supabase

techstore-backend/
└── server.js              # API REST en Express (ya no la usa el blog, ver abajo)
```

## Conexión con Supabase

El blog (`BlogList.jsx`) ya no consume una API propia en Node/Express: habla directamente con una tabla `posts` en Supabase.

- **`src/services/supabaseClient.js`** crea el cliente de Supabase una sola vez (patrón singleton) a partir de dos variables de entorno.
- **`src/services/postService.js`** usa ese cliente para leer (`select`), crear (`insert`) y eliminar (`delete`) filas de la tabla `posts`. Es la única capa que sabe que existe Supabase; el componente `BlogList.jsx` solo llama a `postService.obtenerTodos()`, `postService.crear()` y `postService.eliminar()`.

### Paso a paso para conectar tu propio proyecto a Supabase

1. **Crear cuenta y proyecto en Supabase**
   - Entra a [supabase.com](https://supabase.com) e inicia sesión (o crea una cuenta gratis).
   - Click en **New Project**, elige una organización, ponle un nombre, define una contraseña para la base de datos y selecciona una región.
   - Espera unos minutos a que Supabase termine de aprovisionar el proyecto.

2. **Crear la tabla `posts`**
   - En el dashboard del proyecto, ve a **Table Editor** → **New table** (o usa el **SQL Editor**).
   - Crea la tabla `posts` con estas columnas (`postService.js` asume al menos estas):

     | Columna      | Tipo                     |
     |--------------|--------------------------|
     | `id`         | identificador (PK, autoincremental o `uuid`) |
     | `titulo`     | texto                    |
     | `contenido`  | texto                    |
     | `autor`      | texto                    |
     | `created_at` | timestamp (con default `now()`) |

   - Alternativa rápida por SQL Editor:
     ```sql
     create table posts (
       id bigint generated always as identity primary key,
       titulo text not null,
       contenido text not null,
       autor text,
       created_at timestamptz default now()
     );
     ```

3. **Configurar Row Level Security (RLS)**
   - Ve a **Authentication → Policies** (o **Table Editor** → tabla `posts` → **RLS**).
   - Habilita RLS y crea políticas que permitan `select`, `insert` y `delete` (para este proyecto de práctica, una política abierta basta; en producción conviene restringirla).

4. **Obtener las credenciales del proyecto**
   - Ve a **Project Settings → API**.
   - Copia la **Project URL** y la **anon public key** (o `Publishable key` en proyectos nuevos).

5. **Crear el archivo `.env.local`**
   - En la raíz del proyecto (mismo nivel que `package.json`), crea un archivo `.env.local` (ya está en `.gitignore`, no se sube al repo) con:
     ```
     VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
     VITE_SUPABASE_ANON_KEY=tu-clave-anonima-publica
     ```
   - Vite solo expone al navegador las variables que empiezan con `VITE_`.

6. **Instalar dependencias y correr el proyecto**
   ```bash
   npm install
   npm run dev
   ```
   Si las variables no están definidas o son incorrectas, `BlogList` fallará al leer/crear/eliminar publicaciones (revisa la consola del navegador para ver el error de conexión).

La `anon key` es pública por diseño; el acceso real a los datos se controla con las políticas de RLS configuradas en Supabase, no ocultando esta clave.

## Backend heredado (`techstore-backend/`)

Es un servidor Express con endpoints REST (`GET/POST/DELETE /api/posts`) que originalmente alimentaba el blog con datos en memoria. Se mantiene en el repo como referencia de cómo se construye una API REST desde cero, pero **el frontend ya no lo consume**: esa responsabilidad la tomó Supabase a través de `postService.js`. Si se quiere levantar de todas formas:

```bash
cd techstore-backend
npm install
node server.js
```

## Cómo correr el frontend

```bash
npm install
npm run dev
```

Antes de levantar el proyecto, asegúrate de tener `.env.local` con las variables de Supabase descritas arriba; de lo contrario `BlogList` fallará al intentar leer/crear/eliminar publicaciones.

---

_Proyecto base generado con la plantilla oficial de Vite + React (Oxlint)._
