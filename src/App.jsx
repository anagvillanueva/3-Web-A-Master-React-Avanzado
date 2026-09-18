import { RegisterForm } from './components/auth/RegisterForm';
import { LoginForm } from './components/auth/LoginForm';
import { useState } from 'react';
import { ProductList } from './components/products/ProductList';
import { Navbar } from './components/Navbar';
import { UserProvider } from './context/UserContext';

function App(){
    const [vistaActual, setVistaActual] = useState('catalogo');

    return (
      // UserProvider "envuelve" toda la app para que cualquier componente
      // hijo (Navbar, LoginForm, etc.) pueda leer/actualizar el usuario
      // con useContext(UserContext), sin tener que pasar props manualmente
      // en cada nivel (esto es lo que se conoce como "prop drilling").
      <UserProvider>
        <div>
          <Navbar vistaActual={vistaActual} setVistaActual={setVistaActual}/>

          <main>
            {vistaActual === 'registro' && <RegisterForm/>}
            {vistaActual === 'login' && <LoginForm/>}
            {vistaActual === 'catalogo' && <ProductList/>}
          </main>
        </div>
      </UserProvider>
    )
}
export default App;