export const chatTypes={
    DIRECT: "DIRECT",
    GROUP: "GROUP",
    SUBGROUP: "SUBGROUP",
};

export const chatActions={
    SET_CHOSEN_CHAT_DETAILS:'CHAT.SET_CHOSEN_CHAT_DETAILS',
    SET_MESSAGES:'CHAT.SET_MESSAGES',
    SET_CHAT_TYPE:'CHAT.SET_CHAT_TYPE',
    SET_CHOSEN_GROUP:'GROUPS.SET_CHOSEN_GROUP'
};

export const getActions=(dispatch)=>{
    return{
        setChosenChatDetails:(details,chatType)=>
            dispatch(setChosenChatDetails(details,chatType)),
        setChosenGroup:(participants)=>
            dispatch(setChosenGroup(participants)),
    };
};

export const setChosenChatDetails=(chatDetails, type)=>{
    return{
        type:chatActions.SET_CHOSEN_CHAT_DETAILS,
        chatType:type,
        chatDetails,
    };
};

export const setChosenGroup=(group)=>{
    return{
        type:chatActions.SET_CHOSEN_GROUP,
        group,
    };
};

export const setMessages=(messages)=>{
    return {
        type: chatActions.SET_MESSAGES,
        messages,
    };
};