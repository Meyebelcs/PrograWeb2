import { openAlertMessage } from "./alertActions";
import * as api from '../../api';

export const groupsActions={
    SET_GROUPS:'GROUPS.SET_GROUPS',
    SET_PARTICIPANTS:'GROUPS.SET_PARTICIPANTS'
};

export const getActions=(dispatch)=>{
    return{
        createGroup:(data,closeDialogHandler)=>dispatch(createGroup(data,closeDialogHandler)),
        createSubgroup:(data,closeDialogHandler)=>dispatch(createSubgroup(data,closeDialogHandler)),
        setSelectedGroupParticipants:(participants)=>
            dispatch(setSelectedGroupParticipants(participants)),
    };
};

export const setGroups=(groups)=>{
    return{
        type:groupsActions.SET_GROUPS,
        groups,
    };
};

export const setSelectedGroupParticipants=(participants)=>{
    console.log(participants);
    return{
        type:groupsActions.SET_PARTICIPANTS,
        participants,
    };
};

const createGroup=(data,closeDialogHandler)=>{
    return async (dispatch)=>{
        const response=await api.createGroup(data);
        if(response.error){
            dispatch(openAlertMessage(response.exception?.response?.data));
        }else{
            dispatch(openAlertMessage('El grupo ha sido creado!'));
            closeDialogHandler();
        }
    };
};

const createSubgroup=(data,closeDialogHandler)=>{
    return async (dispatch)=>{
        const response=await api.createSubgroup(data);
        if(response.error){
            dispatch(openAlertMessage(response.exception?.response?.data));
        }else{
            dispatch(openAlertMessage('El subgrupo ha sido creado!'));
            closeDialogHandler();
        }
    };
};