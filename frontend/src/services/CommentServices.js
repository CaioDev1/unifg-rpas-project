import { api } from '../api';

export const getAllComments = async () => {
    const { data } = await api.get(`/comments`);
    return data;
};

export const getCommentById = async (id) => {
    const { data } = await api.get(`/comments/${id}`);
    return data;
};

export const getCommentByAuthorId = async (id) => {
    const { data } = await api.get(`/comments/author/${id}`);
    return data;
};

export const getCommentByProductId = async (id) => {
    const { data } = await api.get(`/comments/product/${id}`);
    return data;
};

export const addComment = async (productId, comment, author) => {
    const { data } = await api.post(`/comments`, {
        for: productId,
        comment,
        author
    });
    return data;
};

export const updateComment = async (id, productId, comment, author) => {
    const { data } = await api.put(`/comments/${id}`, {
        for: productId,
        comment,
        author
    });
    return data;
};

export const deleteComment = async (id) => {
    const { data } = await api.delete(`/comments/${id}`);
    return data;
};