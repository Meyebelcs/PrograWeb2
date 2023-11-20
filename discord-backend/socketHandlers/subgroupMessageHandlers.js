const Message = require("../models/message");
const Subgroup = require("../models/subgroup");
const chatUpdates = require("./updates/chat");
const serverStore = require("../serverStore");

const groupMessageHandler = async (socket, data) => {
  try {
    
    const allowedContentTypes = ['application/pdf', 'image/jpeg', 'image/png', 'text', 'location'];
    const fileContentTypes = ['application/pdf', 'image/jpeg', 'image/png'];

    const io = serverStore.getSocketServerInstance();

    const { userId } = socket.user;
    const { subgroupId, content, contentType, filename } = data;

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