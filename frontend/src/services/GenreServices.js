import { api } from '../api';

export const getAllGenres = async () => {
    const { data } = await api.get(`/genres`);
    return data;
};

export const getGenreById = async (id) => {
    const { data } = await api.get(`/genres/${id}`);
    return data;
};

export const addGenre = async (name, status) => {
    const { data } = await api.post(`/genres`, {
        name,
        status
    });
    return data;
};

export const updateGenre = async (id, name, status) => {
    const { data } = await api.put(`/genres/${id}`, {
        name,
        status
    });
    return data;
};

export const deleteGenre = async (id) => {
    const { data } = await api.delete(`/genres/${id}`);
    return data;
};