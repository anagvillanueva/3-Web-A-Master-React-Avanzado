// URL de la API publica 
const API_URL = 'https://fakestoreapi.com/products';

export const productService = {
    //Obtiene todos los productos
    obtenerTodos(){
        return API_URL;
    },

    //Obtiene los productos por categoria
    obtenerPorCategoria(categoria){
        return `${API_URL}/category/${categoria}`
    },

    //Obtiene un producto por ID
    obtenerPorId(id){
        return `${API_URL}/${id}`
    }
};