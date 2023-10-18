import {groupsActions} from '../actions/groupsActions';

const initState={
    groups:[],
}

const reducer=(state=initState, action)=>{
    switch(action.type){
         case groupsActions.SET_GROUPS:
            return{
                ...state,
                groups:action.groups
            };
        default:
            return state;
    }
};

export default reducer;