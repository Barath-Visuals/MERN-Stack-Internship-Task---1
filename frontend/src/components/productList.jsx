import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../service/productApi";
import ProductCard from "./productCard";

export default function ProductList ({onEdit, refresh}) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchProducts = async () => {
        try{
            setLoading(true);
            const data = await getProducts();
            setProducts(data);
        } catch (error) {
            setError("Failed to load products")
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [refresh]);

    const handleDelete = async (id) => {
        try{
            await deleteProduct(id);

            setProducts((previousProduct) => 
                previousProduct.filter(
                    (product) => product._id !== id
                )
            );
        } catch (error) {
            setError("Failed to delete product");
        }
    };

    if(loading){
        return <p className="text-center text-gray-500">Loading products...</p>;
    }

    if(error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return(
        <div className="flex-col">
            <div className="mt-4 mb-2">
                <h1 className="text-2xl font-medium text-gray-900">Products</h1>
                <p className="text-sm text-gray-500">
                    {products.length} product
                    {products.length !== 1 && "s"}
                </p>
            </div>

            {products.length === 0 ? (
                <div className="rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center">
                    <p className="text-gray-500">No Products Found</p>
                </div>
            ):(
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {products.map((product) => (
                        <ProductCard
                            key={product._id}
                            product={product}
                            onEdit={onEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};