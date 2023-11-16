const serverStore = require('../serverStore');
const roomsUpdates = require("./updates/rooms");

const roomCreateHandler = (socket,data) => {
    console.log('handling room create event');
    const socketId = socket.id;
    const userId = socket.user.userId;

    const roomDetails = serverStore.addNewActiveRoom(userId, socketId, data.chatId, data.chatType);

    socket.emit('room-create', {
        roomDetails,
    });

    roomsUpdates.updateRooms();
};

module.exports = roomCreateHandler;