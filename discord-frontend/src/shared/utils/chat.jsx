import store from "../../store/store";
import { setMessages } from "../../store/actions/chatActions";

export const updateDirectChatHistoryIfActive = (data) => {
  const { participants, messages } = data;

  // find id of user from token and id from active conversation
  const receiverId = store.getState().chat.chosenChatDetails?.id;
  const userId = store.getState().auth.userDetails._id;

  if (receiverId && userId) {
    const usersInCoversation = [receiverId, userId];

    updateChatHistoryIfSameConversationActive({
      participants,
      usersInCoversation,
      messages,
    });
  }
};

const updateChatHistoryIfSameConversationActive = ({
  participants,
  usersInCoversation,
  messages,
}) => {
  const result = participants.every(function (participantId) {
    return usersInCoversation.includes(participantId);
  });

  if (result) {
    store.dispatch(setMessages(messages));
  }
};

export const updateGroupChatHistoryIfActive = (data) => {
    const {messages, id}=data;

    //find id of user from token and id from active conversation
    const groupInConversation= store.getState().chat.chosenChatDetails?.id;
    
    if(groupInConversation){
        updateChatGroupIfSameConversationActive({
            id,
            groupInConversation,
            messages,
        });
    }
};


 const updateChatGroupIfSameConversationActive = ({
    id,
    groupInConversation,
    messages
})=>{
    if(groupInConversation===id){
        store.dispatch(setMessages(messages));
    }
};

/*export const updateSubgroupChatHistoryIfActive = (data) => {
    const {messages, id}=data;

    //find id of user from token and id from active conversation
    const subgroupId= store.getState().chat.chosenChatDetails?.id;
    console.log(id);
    console.log(subgroupId);

    if(subgroupId){
        const groupInConversation = subgroupId;

        updateChatGroupIfSameConversationActive({
            id,
            groupInConversation,
            messages,
        });
    }
};*/