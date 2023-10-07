export const chatTypes={
    DIRECT: "DIRECT",
    GROUP: "GROUP",
    //SUBGROUP: "SUBGROUP",
};

export const chatActions={
    SET_CHOSEN_CHAT_DETAILS:'CHAT.SET_CHOSEN_CHAT_DETAILS',
    //SET_CHOSEN_SUBGROUP:'CHAT.SET_CHOSEN_SUBGROUP',
    SET_MESSAGES:'CHAT.SET_MESSAGES',
    SET_CHAT_TYPE:'CHAT.SET_CHAT_TYPE',
};

export const getActions=(dispatch)=>{
    return{
        setChosenChatDetails:(details,chatType)=>
            dispatch(setChosenChatDetails(details,chatType)),
        /* setChosenSubgroup:(details)=>
            dispatch(setChosenSubgroup(details)), */
    };
};

export const setChosenChatDetails=(chatDetails, type)=>{
    return{
        type:chatActions.SET_CHOSEN_CHAT_DETAILS,
        chatType:type,
        chatDetails
    };
};

/* export const setChosenSubgroup=(subgroupDetails, type)=>{
    console.log(subgroupDetails);
    return{
        type:chatActions.SET_CHOSEN_SUBGROUP,
        subgroupDetails
    };
}; */

export const setMessages=(messages)=>{
    return {
        type: chatActions.SET_MESSAGES,
        messages,
    };
};