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

const checkResponseCode=(exception)=>{
    const checkResponseCode=exception?.response?.status;

    if(responseCode){
        (responseCode===401||responseCode===403) && logout();
    }
};