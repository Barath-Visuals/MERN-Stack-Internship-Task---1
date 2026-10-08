import { useEffect, useState } from "react";

export default function ProductForm({
    product,
    onSubmit,
    onCancel,
}) {
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        category: "",
        description: "",
        image: "",
        user: {
            name: "",
            email: "",
        },
    });

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name || "",
                price: product.price || "",
                category: product.category || "",
                description: product.description || "",
                image: product.image || "",
                user: {
                    name: product.user?.name || "",
                    email: product.user?.email || "",
                },
            });
        } else {
            setFormData({
                name: "",
                price: "",
                category: "",
                description: "",
                image: "",
                user: {
                    name: "",
                    email: "",
                },
            });
        }
    }, [product]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value,
        }));
    };

    const handleUserChange = (event) => {
        const { name, value } = event.target;

        setFormData((previousData) => ({
            ...previousData,
            user: {
                ...previousData.user,
                [name]: value,
            },
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        onSubmit({
            ...formData,
            price: Number(formData.price),
            ...(product && {
                id: product._id,
            }),
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
        >
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">
                        {product ? "Edit Product" : "Add Product"}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        {product
                            ? "Update product information"
                            : "Add a new product"}
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onCancel}
                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                >
                    Close
                </button>
            </div>

            {/* Product fields */}
            <div className="grid gap-4 md:grid-cols-2">

                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Product Name
                    </label>

                    <input
                        type="text"
                        name="name"
                        placeholder="Laptop"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-black"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Price
                    </label>

                    <input
                        type="number"
                        name="price"
                        placeholder="50000"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-black"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Category
                    </label>

                    <input
                        type="text"
                        name="category"
                        placeholder="Electronics"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-black"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Image URL
                    </label>

                    <input
                        type="text"
                        name="image"
                        placeholder="https://images.unsplash.com/..."
                        value={formData.image}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-black"
                    />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Description
                    </label>

                    <textarea
                        name="description"
                        placeholder="Product description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows="4"
                        className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-black"
                    />
                </div>

                {/* User name */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        User Name
                    </label>

                    <input
                        type="text"
                        name="name"
                        placeholder="Barath"
                        value={formData.user.name}
                        onChange={handleUserChange}
                        required
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-black"
                    />
                </div>

                {/* User email */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        User Email
                    </label>

                    <input
                        type="email"
                        name="email"
                        placeholder="barath@example.com"
                        value={formData.user.email}
                        onChange={handleUserChange}
                        required
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-black"
                    />
                </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex justify-end gap-3">

                <button
                    type="button"
                    onClick={onCancel}
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
                >
                    {product ? "Update Product" : "Add Product"}
                </button>

            </div>
        </form>
    );
}