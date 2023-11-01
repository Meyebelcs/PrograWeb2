import {chatActions} from '../actions/chatActions';

const initState={
    chosenChatDetails:null,
   /*  chosenSubgroup:null, */
    chatType:null,
    messages:[],
    chosenGroup:null
};

const reducer=(state=initState, action)=>{
    switch(action.type){
        case chatActions.SET_CHOSEN_CHAT_DETAILS:
            return{
                ...state,
                chosenChatDetails: action.chatDetails,
                chatType: action.chatType,
                messages:[],
            };
       /*  case chatActions.SET_CHOSEN_SUBGROUP:
            return{
                ...state,
                chosenSubgroup: action.chatDetails,
                messages:[],
            }; */
        case chatActions.SET_MESSAGES:
            return{
                ...state,
                messages: action.messages,
            }; 
        case chatActions.SET_CHOSEN_GROUP:
            return{
                ...state,
                chosenGroup:action.group
            };
        default:
            return state;
    }
};

export default reducer;