import axios from 'axios';

const apiClient = axios.create({
    baseURL:'http://localhost:5002/api',
    timeout:1000
});

//Antes de que los request sean ejecutados en el server se ejecutará esta lógica
apiClient.interceptors.request.use((config)=>{
    const userDetails = localStorage.getItem('user');

    if(userDetails){
        const token=JSON.parse(userDetails).token;
        config.headers.Authorization=`Bearer ${token}`;
    }

    return config;
},(err)=>{
    return Promise.reject(err);
});

//public roots


export const login = async(data)=>{
    try{
        return await apiClient.post('/auth/login',data);
    }catch(exception){
        return {
            error:true,
            exception,
        };
    }
};

export const register=async (data)=>{
    try{
        return await apiClient.post("/auth/register",data);
    }catch(exception){
        return{
            error:true,
            exception,
        };
    }
};

//secure routes (solo se recibirá respuesta si el token es correcto)

export const sendFriendInvitation=async(data)=>{
    try{
        return await apiClient.post('/friend-invitation/invite',data);
    }catch(exception){
        checkResponseCode(exception);
        return{
            error:true,
            exception,
        };
    }
};

export const acceptFriendInvitation=async(data)=>{
    try{
        return await apiClient.post('/friend-invitation/accept',data);
    }catch(exception){
        checkResponseCode(exception);
        return{
            error:true,
            exception,
        };
    }
};

export const rejectFriendInvitation=async(data)=>{
    try{
        return await apiClient.post('/friend-invitation/reject',data);
    }catch(exception){
        checkResponseCode(exception);
        return{
            error:true,
            exception,
        };
    }
};

const checkResponseCode=(exception)=>{
    const responseCode=exception?.response?.status;

    if(responseCode){
        (responseCode===401||responseCode===403) && logout();
    }
};