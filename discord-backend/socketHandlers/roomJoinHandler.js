const serverStore = require('../serverStore');
const roomsUpdates = require('./updates/rooms');
const History= require("../models/history");

const roomJoinHandler = async (socket, data) => {
    const { roomId } = data;

    const participantDetails = {
        userId: socket.user.userId,
        socketId: socket.id,
    };

    const roomDetails = serverStore.getActiveRoom(roomId);
    serverStore.joinActiveRoom(roomId, participantDetails);

    const history = await History.create({
        userId:socket.user.userId,
        action:'Join room',
    });

    //Send information to users in room that they should prepare for incoming connection
    roomDetails.participants.forEach((participant) => {
        if(participant.socketId !== participantDetails.socketId){
            socket.to(participant.socketId).emit('conn-prepare', {
                connUserSocketId: participantDetails.socketId,
            });
        }
    });

    roomsUpdates.updateRooms();
};

module.exports = roomJoinHandler;