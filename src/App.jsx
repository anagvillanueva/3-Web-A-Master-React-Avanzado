import { RegisterForm} from './components/auth/RegisterForm';
import { useState } from 'react'
import { ProductList } from './components/products/ProductList'

function App(){
  // Cambiar vistas entre registro y catologo 
  const [vistaActual, setVistaActual] = useState('registro');

  return(
    <div>
      <nav>
        <button onClick={() => setVistaActual('registro')}>Crear Cuenta</button>
        <button onClick={() => setVistaActual('catalogo')}>Ver Catalogo</button>
      </nav>

      {/*Mostrar el componente segun la vista */}
      {vistaActual === 'registro' && <RegisterForm/>}
      {vistaActual === 'catalogo' && <ProductList/>}
    </div>
  );
}
export default App;