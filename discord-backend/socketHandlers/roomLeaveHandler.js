const serverStore = require("../serverStore");
const roomsUpdate = require("./updates/rooms");
const History= require("../models/history");

const roomLeaveHandler = async (socket, data) => {
    const { roomId } = data;

    const activeRoom = serverStore.getActiveRoom(roomId);

    if(activeRoom){
        serverStore.leaveActiveRoom(roomId, socket.id);

        const history = await History.create({
            userId:socket.user.userId,
            action:'Leave room',
        });

        const updatedActiveRoom = serverStore.getActiveRoom(roomId);

        if(updatedActiveRoom){
            updatedActiveRoom.participants.forEach(participant => {
                socket.to(participant.socketId).emit('room-participant-left', {
                    connUserSocketId: socket.id,
                });
            });
        }

        roomsUpdate.updateRooms();
    }
};

module.exports = roomLeaveHandler;