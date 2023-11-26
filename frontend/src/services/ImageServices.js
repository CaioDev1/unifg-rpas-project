import { api } from '../api';

export const getAllImages = async () => {
    const { data } = await api.get(`images`);
    return data;
};

export const getImageById = async (id) => {
    const { data } = await api.get(`images/${id}`);
    return data;
};

export const addImage = async (url) => {
    const { data } = await api.post(`images`, {
        url
    });
    return data;
};

export const deleteImage = async (id) => {
    const { data } = await api.delete(`images/${id}`);
    return data;
};

export const getAllMiniImages = async () => {
    const { data } = await api.get(`minis`);
    return data;
};

export const getMiniImageById = async (id) => {
    const { data } = await api.get(`minis/${id}`);
    return data;
};

export const addMiniImage = async (url) => {
    const { data } = await api.post(`minis`, {
        url
    });
    return data;
};

export const deleteMiniImage = async (id) => {
    const { data } = await api.delete(`minis/${id}`);
    return data;
};

// CLOUDINARY

export const uploadImageToCloudinary = async (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);
    data.append("cloud_name", process.env.REACT_APP_CLOUD_NAMEE);
    const result = await fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: data
    })
        .then(res => res.json());
    return result;
};