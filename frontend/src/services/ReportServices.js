import { api } from '../api';

export const getAllReports = async () => {
    const { data } = await api.get(`reports`);
    return data;
};

export const getReportById = async (id) => {
    const { data } = await api.get(`reports/${id}`);
    return data;
};

export const getReportByUserId = async (id) => {
    const { data } = await api.get(`reports/user/${id}`);
    return data;
};

export const addReport = async (orderId, userId, content) => {
    const { data } = await api.post(`reports`, {
        orderId,
        userId,
        content
    });
    return data;
};

export const updateReport = async ({ id, orderId, userId, content, status }) => {
    const { data } = await api.put(`reports/${id}`, {
        orderId,
        userId,
        content,
        status
    });
    return data;
};

export const deleteReport = async (id) => {
    const { data } = await api.delete(`reports/${id}`);
    return data;
};