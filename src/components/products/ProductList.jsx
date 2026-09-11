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
            <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 py-16 text-center">
                <h2 className="text-2xl font-semibold text-gray-900">Catalogo de productos</h2>
                <p className="text-sm text-gray-500">Cargando productos...</p>
                {/*Mas adelante agregaremos un spinner */}
            </div>
        );
    }
    // Estado 3: Error
    if(error){
        return(
            <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 py-16 text-center">
                <h2 className="text-2xl font-semibold text-gray-900">Catalogo de productos</h2>
                <p className="text-sm text-red-600">Error al cargar los productos: {error}</p>
                <button className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-2">
                    Reintentar
                </button>
            </div>
        );
    }
    // Estado 2: Datos cargados
    return(
        <div className="mx-auto max-w-6xl">
            <div className="mb-6 text-left">
                <h2 className="text-2xl font-semibold text-gray-900">Catalogo de productos</h2>
                <p className="text-sm text-gray-500">Total de productos: {productos?.length || 0}</p>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {productos && productos.map(producto =>(
                    <ProductCard key={producto.id} producto={producto}/>
                ))}
            </div>
        </div>
    );
}
