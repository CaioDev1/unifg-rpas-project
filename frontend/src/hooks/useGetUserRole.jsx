import {useState, useEffect} from 'react';

import { getUserById } from '../services/UserServices';

const useGetUserRole = (userId) => {

    const [admin,setAdmin]=useState(false);

    useEffect(()=>{
        if(!userId) return;
        
        getUserById(userId)
        .then((result)=>{
            setAdmin(result.user.admin);
        });
    },[userId]);

  return [admin];
}

export default useGetUserRole;