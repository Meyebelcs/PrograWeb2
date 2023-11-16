import {groupsActions} from '../actions/groupsActions';

const initState={
    groups:[],
    selectedGroupParticipants:[],
    isInCall:null,
}

const reducer=(state=initState, action)=>{
    switch(action.type){
         case groupsActions.SET_GROUPS:
            return{
                ...state,
                groups:action.groups
            };
         case groupsActions.SET_PARTICIPANTS:
            return{
                ...state,
                selectedGroupParticipants:action.participants
            };
        default:
            return state;
    }
};

export default reducer;