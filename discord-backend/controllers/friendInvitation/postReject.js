const friendInvitation = require("../../models/friendInvitation");
const friendsUpdates=require('../../socketHandlers/updates/friends');

const postReject=async(req,res)=>{
    try{
        const {id}=req.body;
        const {userId}=req.user;

        //remove that invitation from friend invitations collection
        const invitationExists=await friendInvitation.exists({_id:id});

        if(invitationExists){
            await friendInvitation.findByIdAndDelete(id);
        }

        //update pending invitations
        friendsUpdates.updateFriendsPendingInvitations(userId);

        return res.status(200).send('La invitación ha sido rechazada exitosamente');

    }catch(err){
        console.log(err);
        return res.status(500).send('Algo salió mal. Por favor intente de nuevo');
    }
    
};

module.exports=postReject;