const serverStore= require('../serverStore');
const friendsUpdates=require('../socketHandlers/updates/friends');
const groupsUpdate=require('../socketHandlers/updates/groups');

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

};

module.exports=newConnectionHandler;