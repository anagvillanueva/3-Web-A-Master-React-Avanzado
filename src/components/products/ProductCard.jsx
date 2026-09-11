export function ProductCard({producto}){
    return (
        <div>
            <img src={producto.image} alt={producto.title} />
            <h3>{producto.title}</h3>
            <p>{producto.description}</p>

            <div>
                <span>Categoria: {producto.category}</span>
            </div>

            <div>
                <strong>Precio: ${producto.price}</strong>
            </div>
            <div>
                <span>Rating: {producto.rating.date}⭐({producto.rating.count})</span>
            </div>

            <button> Agregar al carrito</button>
        </div>
    )
}