const serverStore = require('../serverStore');
const roomsUpdates = require("./updates/rooms");
const History= require("../models/history");

const roomCreateHandler = async (socket,data) => {
    console.log('handling room create event');
    const socketId = socket.id;
    const userId = socket.user.userId;

    const roomDetails = serverStore.addNewActiveRoom(userId, socketId, data.chatId, data.chatType);

    const history = await History.create({
        userId:socket.user.userId,
        action:'Create room',
    });

    socket.emit('room-create', {
        roomDetails,
    });

    roomsUpdates.updateRooms();
};

module.exports = roomCreateHandler;