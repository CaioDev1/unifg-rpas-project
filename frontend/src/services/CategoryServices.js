import { api } from '../api';

export const getAllCategories = async () => {
    const { data } = await api.get(`/categories`);
    return data;
};

export const getCategoryByGenre = async (genre) => {
    const { data } = await api.get(`/categories/genre/${genre}`);
    return data;
};

export const getCategoryById = async (id) => {
    const { data } = await api.get(`/categories/${id}`);
    return data;
};

export const addCategory = async (name, genre, status) => {
    const { data } = await api.post(`/categories`, {
        name,
        genre,
        status
    });
    return data;
};

export const updateCategory = async (id, name, genre, status) => {
    const { data } = await api.put(`/categories/${id}`, {
        name,
        genre,
        status
    });
    return data;
};

export const deleteCategory = async (id) => {
    const { data } = await api.delete(`/categories/${id}`);
    return data;
};