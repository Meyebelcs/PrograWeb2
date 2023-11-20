const Message = require("../models/message");
const Conversation = require("../models/conversation");
const History= require("../models/history");
const chatUpdates = require("./updates/chat");
const serverStore = require("../serverStore");

const directMessageHandler = async (socket, data) => {
  try {

    const allowedContentTypes = ['application/pdf', 'image/jpeg', 'image/png', 'text', 'location'];
    const fileContentTypes = ['application/pdf', 'image/jpeg', 'image/png'];

    const io = serverStore.getSocketServerInstance();

    const { userId } = socket.user;
    const { receiverUserId, content, contentType, filename } = data;

    if(receiverUserId.length<1){
      return io.emit("error-message", "Lo sentimos, ha ocurrido un error interno. Por favor, inténtalo de nuevo más tarde.");
    }

    if(content.length<1){
      return io.emit("error-message", "Por favor, asegúrate de ingresar un mensaje antes de enviar.");
    }

    if(contentType.length<1){
      return io.emit("error-message", 'El mensaje no tiene un tipo de contenido válido.');
    }

    if(!allowedContentTypes.includes(contentType)){
      return io.emit("error-message", 'El mensaje no tiene un tipo de contenido válido.');
    }

    if(fileContentTypes.includes(contentType) && filename.length<1){
      return io.emit("error-message", 'El archivo adjunto no tiene un nombre válido.');
    }


    // create new message
    const message = await Message.create({
      content: content,
      author: userId,
      date: new Date(),
      type: "DIRECT",
      contentType:contentType,
      filename:filename

    });

    const history = await History.create({
        userId:userId,
        action:'Send message',
    });


    // find if conversation exist with this two users - if not create new
    const conversation = await Conversation.findOne({
      participants: { $all: [userId, receiverUserId] },
    });
    //if exists add a message at the conversation
    if (conversation) {
      conversation.messages.push(message._id);
      await conversation.save();

      // perform and update to sender and receiver if is online
     chatUpdates.updateChatHistory(conversation._id.toString());
    
    } else {
      // create new conversation if not exists
      const newConversation = await Conversation.create({
        messages: [message._id],
        participants: [userId, receiverUserId],
      });

      // perform and update to sender and receiver if is online
      chatUpdates.updateChatHistory(newConversation._id.toString());
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = directMessageHandler;
