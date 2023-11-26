import { api } from '../api';

export const getAllProducts = async () => {
    const { data } = await api.get(`products`);
    return data;
};

export const getProductById = async (id) => {
    const { data } = await api.get(`products/${id}`);
    return data;
};

export const getProductByPrice = async (lowest, uppest) => {
    const { data } = await api.post(`products/query/price`, {
        lowest,
        uppest
    });
    return data;
};

export const getProductByCategoryId = async (id) => {
    const { data } = await api.get(`products/category/${id}`);
    return data;
};

export const getProductByColor = async (color, lowest, uppest) => {
    const { data } = await api.post(`products/color/${color}`, {
        lowest,
        uppest
    });
    return data;
};

export const getProductByGender = async (gender, lowest, uppest) => {
    const { data } = await api.post(`products/gender/${gender}`, {
        lowest,
        uppest
    });
    return data;
};

export const getProductByStatus = async (status) => {
    const { data } = await api.get(`products/status/${status}`);
    return data;
};

export const getProductBySearch = async (search) => {
    const { data } = await api.get(`products/search/${search}`);
    return data;
};

export const getProductsByQueries = async (lowest, uppest, gender, color) => {
    const { data } = await api.post(`products/query/full`, {
        lowest,
        uppest,
        gender,
        color
    });
    return data;
};

export const addProduct = async (imageUrl,name, color, sizes, description, category, gender, price) => {
    const { data } = await api.post(`products`, {
        imageUrl,
        name,
        color,
        sizes,
        description,
        category,
        gender,
        price
    });
    return data;
};

export const updateProduct = async (id, name, description, price) => {
    const { data } = await api.put(`products/${id}`, {
        name,
        description,
        price
    });
    return data;
};

export const deleteProduct = async (id) => {
    const { data } = await api.delete(`products/${id}`);
    return data;
};