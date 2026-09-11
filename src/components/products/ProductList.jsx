import { useFetch } from '../../hooks/useFetch';
import { productService } from '../../services/productService';
import { ProductCard } from './ProductCard';
/*ProductList va listar todos los productos desde la API 
Manejar loading, error y renderizado dinamico*/
export function ProductList(){
    // Usar el hook personalizado para cargar productos
    const { datos: productos, loading, error } = useFetch(
        productService.obtenerTodos()
    );
    // Estado 1: Cargando 
    if(loading){
        return (
            <div> 
                <h2>Catalogo de productos</h2>
                <p>Cargando productos...</p>
                {/*Mas adelante agregaremos un spinner */}
            </div>
        );
    }
    // Estado 3: Error 
    if(error){
        return(
            <div>
                <h2>Catalogo de productos</h2>
                <p>Error al cargar los productos: {error}</p>
                <button>Reintentar</button>
            </div>
        );
    }
    // Estado 2: Datos cargados 
    return(
        <div>
            <h2>Catalogo de productos</h2>
            <p>Total de productos: {productos?.length || 0}</p>
            <div>
                {productos && productos.map(producto =>(
                    <ProductCard key={producto.id} producto={producto}/>
                ))}
            </div>
        </div>
    );
}