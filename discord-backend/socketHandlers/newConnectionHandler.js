const serverStore= require('../serverStore');
const friendsUpdates=require('../socketHandlers/updates/friends');
const groupsUpdate=require('../socketHandlers/updates/groups');
const roomsUpdate=require('./updates/rooms');

const newConnectionHandler = async(socket,io)=>{
    //Obtenemos los datos del usuario
    const userDetails=socket.user;

    //Añadimos al usuario a la lista de usuarios conectados
    serverStore.addNewConnectedUser({
        socketId:socket.id,
        userId:userDetails.userId,
    });

    //update pending friends invitations list
    friendsUpdates.updateFriendsPendingInvitations(userDetails.userId);

    //update friends list
    friendsUpdates.updateFriends(userDetails.userId);

    //update groups list
    groupsUpdate.updateGroups(userDetails.userId);

    setTimeout(() => {
        roomsUpdate.updateRooms(socket.id);
    }, [500]);
};

module.exports=newConnectionHandler;