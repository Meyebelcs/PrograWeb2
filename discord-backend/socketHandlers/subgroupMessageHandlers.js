const Message = require("../models/message");
const Subgroup = require("../models/subgroup");
const chatUpdates = require("./updates/chat");

const groupMessageHandler = async (socket, data) => {
  try {
    console.log("subgroup message event is being handled");

    const { userId } = socket.user;
    const { subgroupId, content, contentType, filename } = data;

    // create new message
    const message = await Message.create({
      content: content,
      author: userId,
      date: new Date(),
      type: "SUBGROUP",
      contentType:contentType,
      filename:filename
    });

    // find if conversation exist with this two users - if not create new
    const subgroup = await Subgroup.findOne({
      _id: subgroupId,
    });

    //if exists add a message at the conversation
    if (subgroup) {
        subgroup.messages.push(message._id);
      await subgroup.save();

    // perform and update to sender and receiver if is online
     chatUpdates.updateSubgroupHistory(subgroup._id.toString());
    
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = groupMessageHandler;