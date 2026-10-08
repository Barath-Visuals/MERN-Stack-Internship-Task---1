import { useState } from "react";
import ProductForm from "./components/productForm";
import ProductList from "./components/productList";

import { createProduct, updateProduct } from "./service/productApi";

export default function App() {
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true)
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowForm(true);
  }

  const handleSubmit = async (product) => {
    try{
      if(editingProduct){
        await updateProduct(product);
      } else{
        await createProduct(product);
      }
      
      setEditingProduct(null);
      setShowForm(false);

      setRefresh((preview) => !preview);
    } catch (error) {
      console.error(error)
    }
  };

  const handleCancel = () => {
    setEditingProduct(null);
    setShowForm(false);
  };

  return(
    <div className="min-h-screen bg-gray-100 p-5">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Product Management
          </h1>
          <p className="text-gray-500 mt-0.5">
            Manage your product
          </p>
        </div>
        <button
          onClick={handleAddProduct}
          className="rounded-lg bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          Add Product
        </button>
      </div>
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
            <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto scrollbar-none">
                <ProductForm
                    product={editingProduct}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                />
            </div>
        </div>
      )}

      <div className="mx-auto mt-8 max-w-7xl">
        <ProductList
          key={refresh}
          onEdit={handleEdit}
        />
      </div>

    </div>
  )
}