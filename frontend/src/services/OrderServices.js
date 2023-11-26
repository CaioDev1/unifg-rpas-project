import { api } from '../api';

export const getAllOrders = async () => {
    const { data } = await api.get(`orders`);
    return data;
};

export const getOrderById = async (id) => {
    const { data } = await api.get(`orders/${id}`);
    return data;
};

export const getOrdersByStatus = async (status) => {
    const { data } = await api.get(`orders/status/${status}`);
    return data;
};

export const getOrdersByUserId = async (id) => {
    const { data } = await api.get(`orders/user/${id}`);
    return data;
};

export const addOrder = async (payload) => {
    const { data } = await api.post(`orders`, payload);
    return data;
};

export const updateOrderStatus = async (id, status, prepare, onWay, delivered, cancel) => {
    const { data } = await api.put(`orders/${id}`, {
        status,
        prepare,
        onWay,
        delivered,
        cancel
    });
    return data;
};

export const deleteOrder = async (id) => {
    const { data } = await api.delete(`orders/${id}`);
    return data;
};