export default function ProductCard ({product, onEdit, onDelete}) {
    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm ">
            <div className=" w-full overflow-hidden bg-gray-100">
                <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
            </div>
            <div className="p-5">
                <div className="mb-3 flex item-start justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                        <p className="text-xs text-gray-500">{product.category}</p>
                    </div>
                    <p className="text-lg font-bold text-gray-500">₹{product.price}</p>
                </div>
                <p className="mb-4 line-clamp-2 text-sm leading-6 text-gray-600">
                    {product.description}
                </p>
                <p className="mb-4 text-xs text-gray-400">
                    Added by: {product.user?.name}
                </p>
                <div className="flex gap-3">
                    <button
                        onClick={() => onEdit(product)}
                        className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                    >
                        Edit
                    </button>

                    <button
                        onClick={() => onDelete(product._id)}
                        className="flex-1 rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}