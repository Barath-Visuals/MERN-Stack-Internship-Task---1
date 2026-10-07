export default function ProductCard ({product, onEdit, onDelete}) {
    return (
        <div>
            <div>
                <img src={product.image} alt={product.name} />
            </div>
            <div>
                <h2>{product.name}</h2>
                <p>{product.price}</p>
                <p>{product.category}</p>
                <p>{product.description}</p>
                <p>Added by: {product.user?.name}</p>
                <button onClick={() => {onEdit(product)}}>Edit</button>
                <button onClick={() => {onDelete(product._id)}}>Delete</button>
            </div>
        </div>
    )
}