const friendInvitation = require("../../models/friendInvitation");
const friendsUpdates=require('../../socketHandlers/updates/friends');
const History= require("../../models/history");

const postReject=async(req,res)=>{
    try{
        const {id}=req.body;
        const {userId}=req.user;

        //remove that invitation from friend invitations collection
        const invitationExists=await friendInvitation.exists({_id:id});

        if(invitationExists){
            await friendInvitation.findByIdAndDelete(id);
        }

        const history = await History.create({
            userId:userId,
            action:'reject friend invitation',
        });

        //update pending invitations
        friendsUpdates.updateFriendsPendingInvitations(userId);

        return res.status(200).send('La invitación ha sido rechazada exitosamente');

    }catch(err){
        console.log(err);
        return res.status(500).send('Algo salió mal. Por favor intente de nuevo');
    }
    
};

module.exports=postReject;