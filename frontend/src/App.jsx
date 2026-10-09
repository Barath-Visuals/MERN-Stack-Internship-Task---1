import { useState } from "react";
import ProductForm from "./components/productForm";
import ProductList from "./components/productList";
import { createProduct, updateProduct } from "./service/productApi";

export default function App() {
  const [activePage, setActivePage] = useState("management");
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
    <div className="min-h-screen bg-[#f3f6fd] text-slate-800">
      <div className="mx-auto flex h-screen w-full overflow-y-hidden bg-white ">
        <aside className="flex w-full shrink-0 flex-col border-b border-slate-100 bg-white p-4 sm:w-60 sm:border-b-0 sm:border-r sm:p-5 lg:w-64">
          <div className="mb-2 flex flex-col items-start gap-1 p-3">
              <p className="font-semibold text-lg tracking-tight text-slate-900">ProductHub</p>
              <p className="text-xs text-slate-400">Inventory workspace</p>
          </div>
          <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">Workspace</p>
          <nav className="flex gap-2 sm:flex-col" aria-label="Main navigation">
            <button onClick={() => setActivePage("view")} className={`flex flex-1 items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition sm:flex-none ${activePage === "view" ? "bg-violet-50 text-violet-800" : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"}`}>
              <span>Product View</span>
            </button>
            <button onClick={() => setActivePage("management")} className={`flex flex-1 items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition sm:flex-none ${activePage === "management" ? "bg-violet-50 text-violet-800" : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"}`}>
              <span>Product Management</span>
            </button>
          </nav>
        </aside>

        <main className="min-w-0 flex-1 bg-[#f8faff] p-4 overflow-y-scroll">
          <header className="mb-4 flex flex-row justify-between gap-4 rounded-2xl border border-slate-100 bg-white p-4">
            <div className="flex flex-col">
              <p className="mb-1 text-xs font-medium uppercase tracking-tight text-violet-600">Workspace / Products</p>
              <h1 className="text-2xl font-semibold tracking-tight text-violet-800">{activePage === "view" ? "Product View" : "Product Management"}</h1>
            </div>
            {activePage === "management" && <button onClick={handleAddProduct} className="inline-flex items-center justify-center gap-2 self-center rounded-lg bg-violet-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-800 focus:outline-none"><span className="text-lg leading-none">+</span> Add Product</button>}
          </header>

          {showForm && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"><div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl"><ProductForm product={editingProduct} onSubmit={handleSubmit} onCancel={handleCancel} /></div></div>}

          <section className="rounded-2xl border border-slate-100 bg-white p-4">
            <ProductList key={`${activePage}-${refresh}`} refresh={refresh} view={activePage} onEdit={handleEdit} />
          </section>
        </main>
      </div>
    </div>
  )
}