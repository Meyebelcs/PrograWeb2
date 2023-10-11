const serverStore= require('../serverStore');
const friendsUpdates=require('../socketHandlers/updates/friends');
const groupsUpdate=require('../socketHandlers/updates/groups');

const newConnectionHandler = async(socket,io)=>{
    const userDetails=socket.user;

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