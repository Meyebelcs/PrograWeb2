const Conversation = require("../../models/conversation");
const Group = require("../../models/group");
const serverStore = require("../../serverStore");

const updateChatHistory = async (
    conversationId,
    toSpecifiedSocketId = null
) => {
    const conversation = await Conversation.findById(conversationId).populate({
        path: "messages",
        model: "Message",
        populate: {
            path: "author",
            model: "User",
            select: "username _id",
        },
    });

    if (conversation) {
        const io = serverStore.getSocketServerInstance();

        if (toSpecifiedSocketId) {
            // initial update of chat history
            return io.to(toSpecifiedSocketId).emit("direct-chat-history", {
                messages: conversation.messages,
                participants: conversation.participants,
            });
        }

        // check if users of this conversation are online
        // if yes emit to them update of messages

        conversation.participants.forEach((userId) => {
            const activeConnections = serverStore.getActiveConnections(
                userId.toString()
            );

            activeConnections.forEach((socketId) => {
                io.to(socketId).emit("direct-chat-history", {
                    messages: conversation.messages,
                    participants: conversation.participants,
                });
            });
        });
    }
};

const updateGroupHistory = async (
    groupId,
    toSpecifiedSocketId = null
) => {
    const group = await Group.findById(groupId).populate({
        path: "messages",
        model: "Message",
        populate: {
            path: "author",
            model: "User",
            select: "username _id",
        },
    });

    if (group) {
        const io = serverStore.getSocketServerInstance();

        if (toSpecifiedSocketId) {
            // initial update of chat history
            return io.to(toSpecifiedSocketId).emit("group-chat-history", {
                messages: group.messages,
                participants: group.participants,
                id:group._id,
            });
        }

        // check if users of this conversation are online
        // if yes emit to them update of messages

        group.participants.forEach((userId) => {
            const activeConnections = serverStore.getActiveConnections(
                userId.toString()
            );

            activeConnections.forEach((socketId) => {
                io.to(socketId).emit("group-chat-history", {
                    messages: group.messages,
                    participants: group.participants,
                    id:group._id,
                });
            });
        });
    }
};

module.exports = { updateChatHistory, updateGroupHistory };
