export const chatTypes={
    DIRECT: "DIRECT",
    GROUP: "GROUP",
    SUBGROUP: "SUBGROUP",
};

export const chatActions={
    SET_CHOSEN_CHAT_DETAILS:'CHAT.SET_CHOSEN_CHAT_DETAILS',
    //SET_CHOSEN_SUBGROUP:'CHAT.SET_CHOSEN_SUBGROUP',
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
        /* setChosenSubgroup:(details)=>
            dispatch(setChosenSubgroup(details)), */
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