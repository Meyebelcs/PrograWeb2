const friendInvitation=require('../../models/friendInvitation');
const User = require('../../models/user');
const History= require("../../models/history");
const friendsUpdates=require('../../socketHandlers/updates/friends');

const postAccept=async(req,res)=>{
    try{
        const {id}=req.body;

        const invitation=await friendInvitation.findById(id);

        if(!invitation){
            return res.status(401).send('Ocurrió un error. Por favor intente de nuevo');
        }

        const {senderId,receiverId}=invitation;

        //add friends to both users
        const senderUser=await User.findById(senderId);
        senderUser.friends=[...senderUser.friends,receiverId];

        const receiverUser = await User.findById(receiverId);
        receiverUser.friends=[...receiverUser.friends,senderId];

        await senderUser.save();
        await receiverUser.save();

        const history = await History.create({
            userId:receiverUser,
            action:'accept friend invitation',
        });

        //delete invitation
        await friendInvitation.findByIdAndDelete(id);

        //update list of the friends if the users are online
        friendsUpdates.updateFriends(senderId.toString());
        friendsUpdates.updateFriends(receiverId.toString());

        //update list of friends pending invitations
        friendsUpdates.updateFriendsPendingInvitations(receiverId.toString());

        return res.status(200).send('Amigo agregado exitosamente');

    }catch(err){
        console.log(err);
        return res.status(500).send('Algo salió mal. Por favor intente más tarde');
    }
};

module.exports=postAccept;