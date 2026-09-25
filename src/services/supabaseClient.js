// ============================================================
// CLIENTE DE SUPABASE - conexión centralizada a la base de datos
// ------------------------------------------------------------
// Supabase nos da una base de datos Postgres + una API auto-generada.
// createClient() crea UNA sola instancia del cliente que se reutiliza
// en toda la app (patrón singleton): cualquier service (como
// postService.js) importa "supabase" desde aquí en vez de configurar
// su propia conexión.
//
// supabaseUrl y supabaseAnonKey vienen de variables de entorno (no se
// escriben directo en el código) para no exponer credenciales en el
// repositorio. Vite solo expone al cliente las variables que empiezan
// con el prefijo "VITE_", y deben definirse en un archivo .env.local
// en la raíz del proyecto (ese archivo está en .gitignore):
//   VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
//   VITE_SUPABASE_ANON_KEY=tu-clave-anonima-publica
//
// La "anon key" es pública y segura de exponer en el frontend: el
// acceso real a los datos se controla con las políticas de Row Level
// Security (RLS) configuradas del lado de Supabase, no ocultando esta
// clave.
// ============================================================

import { createClient} from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
