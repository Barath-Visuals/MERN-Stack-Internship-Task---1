import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../service/productApi";
import ProductCard from "./productCard";

export default function productList ({onEdit}) {
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
    }, []);

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
        return <p>Loading products...</p>;
    }

    if(error) {
        return <p>{error}</p>;
    }

    return(
        <div>
            <h1>Products</h1>

            {products.length === 0 ? (
                <p>No Products Found</p>
            ):(
                products.map((product) => 
                    <ProductCard
                        key={product._id}
                        product={product}
                        onEdit={onEdit}
                        onDelete={handleDelete}
                    />
                )
            )}
        </div>
    );
};