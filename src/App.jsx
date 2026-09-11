import { RegisterForm} from './components/auth/RegisterForm';
import { useState } from 'react'
import { ProductList } from './components/products/ProductList'

function App(){
  // Cambiar vistas entre registro y catologo
  const [vistaActual, setVistaActual] = useState('registro');

  const tabClass = (vista) =>
    `rounded-lg px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-2 ${
      vistaActual === vista
        ? 'bg-purple-600 text-white shadow-sm'
        : 'text-gray-600 hover:bg-purple-50 hover:text-purple-700'
    }`;

  return(
    <div className="min-h-screen bg-gray-50">
      <nav className="flex justify-center gap-2 border-b border-gray-200 bg-white px-6 py-4 shadow-sm">
        <button className={tabClass('registro')} onClick={() => setVistaActual('registro')}>Crear Cuenta</button>
        <button className={tabClass('catalogo')} onClick={() => setVistaActual('catalogo')}>Ver Catalogo</button>
      </nav>

      {/*Mostrar el componente segun la vista */}
      <main className="px-6 py-10">
        {vistaActual === 'registro' && <RegisterForm/>}
        {vistaActual === 'catalogo' && <ProductList/>}
      </main>
    </div>
  );
}
export default App;