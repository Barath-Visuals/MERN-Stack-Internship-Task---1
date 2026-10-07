import axios from "axios";

const API_URL = "http://localhost:5000/api/products";

export const getProducts = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const getProductById = async (id) => {
    const response = await axios.post(`${API_URL}/${id}`);
    return response.data;
};

export const createProduct = async (product) => {
    const response = await axios.post(API_URL, product)
    return response.data;
};

export const updateProduct = async (product) => {
    const response = await axios.post(`${API_URL}/update`, product);
    return response.data;
};

export const deleteProduct = async (id) => {
    const response = await axios.post(`${API_URL}/delete`, {
        id,
    });
    return response.data;
};