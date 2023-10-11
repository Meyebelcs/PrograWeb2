import { openAlertMessage } from "./alertActions";
import * as api from '../../api';

export const groupsActions={
    SET_GROUPS:'GROUPS.SET_GROUPS',
};

export const getActions=(dispatch)=>{
    return{
        createGroup:(data,closeDialogHandler)=>dispatch(createGroup(data,closeDialogHandler)),
    };
};

export const setGroups=(groups)=>{
    return{
        type:groupsActions.SET_GROUPS,
        groups,
    };
};

const createGroup=(data,closeDialogHandler)=>{
    console.log('hola');
    return async (dispatch)=>{
        const response=await api.createGroup(data);
        console.log(response);
        if(response.error){
            dispatch(openAlertMessage(response.exception?.response?.data));
        }else{
            dispatch(openAlertMessage('Group has been created!'));
            closeDialogHandler();
        }
    };
};