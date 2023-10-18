const Message = require("../models/message");
const Group=require("../models/group");
const chatUpdates = require("./updates/chat");

const groupMessageHandler = async (socket, data) => {
  try {
    console.log("group message event is being handled");

   

    const { userId } = socket.user;
    const { groupId, content } = data;
 
    console.log(groupId);

    // create new message
    const message = await Message.create({
      content: content,
      author: userId,
      date: new Date(),
      type: "GROUP",
    });

    // find if conversation exist with this two users - if not create new
    const group = await Group.findOne({
      _id: groupId,
    });

    //if exists add a message at the conversation
    if (group) {
      group.messages.push(message._id);
      await group.save();

      // perform and update to sender and receiver if is online
     chatUpdates.updateGroupHistory(group._id.toString());
    
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = groupMessageHandler;