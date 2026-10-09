export default function ProductCard({ product }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white p-2.5 flex flex-col gap-2.5">
        <div className="flex h-50 items-center justify-center overflow-hidden bg-slate-50 rounded-lg"><img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-300]" onError={(e) => { e.currentTarget.style.visibility = "hidden"; }} /></div>
        <div className="flex flex-col">
            <div className="flex flex-col items-start justify-between">
                <span className="inline-flex rounded-sm bg-violet-50 px-1 py-0.5 text-xs font-semibold text-violet-700">{product.category}</span>
                <div className="flex justify-between w-full">
                    <h3 className="truncate text-sm font-semibold text-slate-900">{product.name}</h3>
                    <p className="shrink-0 text-sm font-bold text-violet-800">₹{Number(product.price || 0).toLocaleString("en-IN")}</p>
                </div>
                <p className="mt-2.5 line-clamp-3 text-xs  text-slate-500">{product.description}</p>
            </div>
        </div>
    </article>
  );
}
