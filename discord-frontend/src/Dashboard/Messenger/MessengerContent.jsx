import React, { useEffect } from "react";
import { styled } from "@mui/system";
import Messages from "./Messages/Messages";
import NewMessageInput from "./NewMessageInput";
import { getDirectChatHistory, getGroupChatHistory, getSubgroupChatHistory } from "../../realtimeCommunication/socketConnection";

const Wrapper = styled("div")({
    flexGrow: 1,
});

const MessengerContent = ({ chosenChatDetails, chatType }) => {
    useEffect(() => {
        if(chatType=='DIRECT'){
            getDirectChatHistory({
                receiverUserId: chosenChatDetails.id,
            });
        }else if(chatType=='GROUP'){
            getGroupChatHistory({
                groupId: chosenChatDetails.id,
            });
        }else if(chatType=='SUBGROUP'){
            getSubgroupChatHistory({
                subgroupId: chosenChatDetails.id,
            });
        }
        
    }, [chosenChatDetails]);

    return (
        <Wrapper>
            <Messages />
            <NewMessageInput />
        </Wrapper>
    );
};

export default MessengerContent;
