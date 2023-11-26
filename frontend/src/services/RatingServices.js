import { api } from '../api';

export const getAllRatings = async () => {
    const { data } = await api.get(`ratings`);
    return data
};

export const getRatingById = async (id) => {
    const { data } = await api.get(`ratings/${id}`);
    return data;
};

export const getRatingByOwnerId = async (ownerId) => {
    const { data } = await api.get(`ratings/owner/${ownerId}`);
    return data;
};

export const getRatingByProductId = async (productId) => {
    const { data } = await api.get(`ratings/product/${productId}`);
    return data;
}

export const addRating = async (product, rating, owner) => {
    const { data } = await api.post(`ratings`, {
        for: product,
        rating,
        owner
    });
    return data;
};

export const updateRating = async (id, product, rating, owner) => {
    const { data } = await api.put(`ratings/${id}`, {
        for: product,
        rating,
        owner
    });
    return data;
};

export const deleteRating = async (id) => {
    const { data } = await api.delete(`ratings/${id}`);
    return data;
};