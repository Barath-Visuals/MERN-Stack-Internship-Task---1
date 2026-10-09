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
    <div className="min-h-screen p-6 flex">
      <div className="p-4 bg-white rounded-2xl flex flex-col gap-4">
        <div className="flex items-center justify-between p-4 rounded-lg
          bg-[#E4EEFF50]"
        >
            <h1 className="text-3xl font-medium text-[#5503DB]">
              Product Management
            </h1>
          <button
            onClick={handleAddProduct}
            className="rounded-lg bg-[#5503DB] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#6e15ff] "
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

        <div className="p-4 bg-[#E4EEFF50] rounded-lg">
          <ProductList
            key={refresh}
            onEdit={handleEdit}
          />
        </div>
      </div>

    </div>
  )
}