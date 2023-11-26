import { api } from '../api';

export const Register = async (firstName, lastName, email, password, phone) =>{
    return await api.post(`/users/register`,{
        firstName,
        lastName,
        email,
        password,
        phone
    });
};

export const Login = async (email, password)=>{
    return await api.post(`/users/login`,{
        email,
        password
    });
};