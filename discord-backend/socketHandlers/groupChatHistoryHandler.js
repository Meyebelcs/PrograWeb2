const Group = require("../models/group");
const chatUpdates = require("./updates/chat");

const groupChatHistoryHandler = async (socket, data) => {
    try {
        const { userId } = socket.user;
        const { groupId } = data;

        console.log(groupId);

        const group = await Group.findOne({_id:groupId});

        if (group) {
            chatUpdates.updateGroupHistory(group._id.toString(), socket.id);
        } else {
            console.log("La conversación no se encontró o es nula.");
        }
    } catch (err) {
        console.log(err);
    }
};

module.exports = groupChatHistoryHandler;