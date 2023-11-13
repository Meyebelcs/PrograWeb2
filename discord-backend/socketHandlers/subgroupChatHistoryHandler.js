const Subgroup = require("../models/subgroup");
const chatUpdates = require("./updates/chat");

const subgroupChatHistoryHandler = async (socket, data) => {
    try {
        const { userId } = socket.user;
        const { subgroupId } = data;

        console.log(subgroupId);

        const subgroup = await Subgroup.findOne({_id:subgroupId});

        if (subgroup) {
            chatUpdates.updateSubgroupHistory(subgroup._id.toString(), socket.id);
        } else {
            console.log("La conversación no se encontró o es nula.");
        }
    } catch (err) {
        console.log(err);
    }
};

module.exports = subgroupChatHistoryHandler;