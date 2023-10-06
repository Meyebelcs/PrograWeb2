const serverStore= require('../serverStore');
const friendsUpdates=require('../socketHandlers/updates/friends');

const newConnectionHandler = async(socket,io)=>{
    const userDetails=socket.user;

    serverStore.addNewConnectedUser({
        socketId:socket.id,
        userId:userDetails.userId,
    });

    //update pending friends invitations list
    friendsUpdates.updateFriendsPendingInvitations(userDetails.userId);
};

module.exports=newConnectionHandler;