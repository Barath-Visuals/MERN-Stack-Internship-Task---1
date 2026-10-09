import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../service/productApi";
import ProductCard from "./productCard";

export default function ProductList ({ onEdit, refresh, view = "management" }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [deletingId, setDeletingId] = useState(null);

    const fetchProducts = async () => {
        try{
            setLoading(true);
            setError("");
            const data = await getProducts();
            setProducts(Array.isArray(data) ? data : []);
        } catch (error) {
            setError("Failed to load products")
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [refresh]);

    const handleDelete = async (product) => {
        const confirmed = window.confirm(`Delete "${product.name}"? This action cannot be undone.`);
        if(!confirmed) return;
        try{
            setDeletingId(product._id);
            await deleteProduct(id);
            setProducts((previous) => 
                previous.filter(
                    (item) => item._id !== product._id
                )
            );
        } catch (error) {
            console.error(error)
            setError("Failed to delete product");
        }finally {
            setDeletingId(null);
        }
    };

    if (loading) return <div className="py-16 text-center text-sm text-slate-500">Loading products…</div>;
    if (error) return <div className="rounded-xl bg-red-50 p-5 text-sm text-red-600">{error} <button onClick={fetchProducts} className="ml-2 font-semibold underline">Retry</button></div>;

    return(
        <div>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div>
                <h2 className="text-lg font-semibold text-slate-800">{view === "view" ? "Product catalog" : "All products"}</h2>
                <p className="mt-1 text-sm text-slate-500">{view === "view" ? "Browse all available products." : "Manage your product details and availability."}</p>
                </div>
                <div className="rounded-xl bg-violet-50 px-4 py-2"><span className="text-xl font-semibold text-violet-800">{products.length.toString().padStart(2, "0")}</span><span className="ml-2 text-sm text-violet-700">{products.length === 1 ? "product" : "products"}</span></div>
            </div>

            {products.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-5 py-16 text-center"><h3 className="font-semibold text-slate-700">No products yet</h3><p className="mt-1 text-sm text-slate-500">Add your first product to get started.</p></div>
            ) : view === "view" ? (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4 ">{products.map((product) => <ProductCard key={product._id} product={product} />)}</div>
            ) : (
                <div className="overflow-hidden rounded-xl border border-slate-200">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[760px] border-collapse text-left">
                    <thead><tr className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500"><th className="px-5 py-4">Product name</th><th className="px-4 py-4">Category</th><th className="px-4 py-4">Price</th><th className="px-4 py-4">Description</th><th className="px-4 py-4">Seller</th><th className="px-5 py-4 text-right">Action</th></tr></thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {products.map((product) => <tr key={product._id} className="transition hover:bg-violet-50/40">
                        <td className="px-5 py-4"><div className="flex items-center gap-3"><img src={product.image} alt="" className="h-11 w-11 shrink-0 rounded-lg border border-slate-100 bg-slate-50 object-cover" onError={(e) => { e.currentTarget.style.visibility = "hidden"; }} /><span className="max-w-[190px] truncate text-sm font-semibold text-slate-800">{product.name}</span></div></td>
                        <td className="px-4 py-4"><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">{product.category}</span></td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm font-semibold text-slate-700">₹{Number(product.price || 0).toLocaleString("en-IN")}</td>
                        <td className="max-w-[260px] px-4 py-4 text-xs text-slate-500"><p className="line-clamp-2">{product.description}</p></td>
                        <td className="max-w-[260px] px-4 py-4 text-xs text-slate-500"><p className="line-clamp-2 truncate">{product.user.name}</p></td>
                        <td className="px-5 py-4"><div className="flex justify-end gap-2"><button onClick={() => onEdit(product)} className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-800">Edit</button><button disabled={deletingId === product._id} onClick={() => handleDelete(product)} className="rounded-lg border border-red-100 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-wait disabled:opacity-50">{deletingId === product._id ? "Deleting…" : "Delete"}</button></div></td>
                        </tr>)}
                    </tbody>
                    </table>
                </div>
                <div className="border-t border-slate-100 bg-slate-50/70 px-5 py-3 text-xs text-slate-500">Showing {products.length} {products.length === 1 ? "product" : "products"}</div>
                </div>
            )}
        </div>
    );
};