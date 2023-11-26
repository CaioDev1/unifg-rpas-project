import { api } from '../api';

export const getAllUsers = async () => {
    const { data } = await api.get(`/users`);
    return data;
};

export const getUserById = async (id) => {
    const { data } = await api.get(`/users/${id}`);
    return data;
};

export const updateUser = async ( id, address, phone ) => {
    const { data } = await api.put(`/users/${id}`, {
        address,
        phone
    });
    return data;
};

export const deleteUser = async (id) => {
    const { data } = await api.delete(`/users/${id}`);
    return data;
};

export const addFavorite = async (id, productId) => {
    const { data } = await api.post(`/users/${id}/favorite/${productId}`);
    return data;
};

export const deleteFavorite = async (id, productId) => {
    const { data } = await api.delete(`/users/${id}/favorite/${productId}`);
    return data;
};