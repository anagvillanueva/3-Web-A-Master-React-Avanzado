export function ProductCard({producto}){
    return (
        <div className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-lg">
            <div className="flex h-48 items-center justify-center bg-gray-50 p-6">
                <img
                    src={producto.image}
                    alt={producto.title}
                    className="h-full w-full object-contain"
                />
            </div>

            <div className="flex flex-1 flex-col gap-2 p-4">
                <span className="w-fit rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium capitalize text-purple-700">
                    {producto.category}
                </span>

                <h3 className="line-clamp-2 text-sm font-semibold text-gray-900">
                    {producto.title}
                </h3>

                <p className="line-clamp-2 text-xs text-gray-500">
                    {producto.description}
                </p>

                <div className="flex items-center gap-1 text-xs text-gray-500">
                    <span className="text-amber-400">⭐</span>
                    <span>{producto.rating.rate}</span>
                    <span>({producto.rating.count})</span>
                </div>

                <div className="mt-auto flex items-center justify-between pt-3">
                    <strong className="text-lg font-semibold text-gray-900">
                        ${producto.price}
                    </strong>
                    <button className="rounded-lg bg-purple-600 px-3 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-2">
                        Agregar
                    </button>
                </div>
            </div>
        </div>
    )
}
