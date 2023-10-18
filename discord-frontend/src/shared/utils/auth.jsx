export const logout=()=>{
    localStorage.clear();//Limpiamos el local storage
    window.location.pathname="/login";//Mandamos al usuario al login
};