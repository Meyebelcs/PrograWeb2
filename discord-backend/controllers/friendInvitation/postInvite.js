const friendInvitation = require('../../models/friendInvitation');
const friendsUpdates=require('../../socketHandlers/updates/friends');
const User=require('../../models/user');
const History= require("../../models/history");

const postInvite=async(req,res)=>{
    const {targetMailAddress}=req.body;

    const {userId, mail}=req.user;

    //check if friend that we wouldlike to invite is not user
    
    if(mail.toLowerCase()===targetMailAddress.toLowerCase()){
        return res
        .status(409)
        .send('Lo siento. No puedes enviarte solicitud de amistad a ti mismo');
    }

    const targetUser= await User.findOne({
        mail:targetMailAddress.toLowerCase(),
    });

    if(!targetUser){
        return res.status(404).send(`El correo ${targetMailAddress} no se ha encontrado. Por favor revise el correo electrónico ingresado`)
    }

    //checar si la invitación ya fué mandada
    const invitationAlreadyReceived=await friendInvitation.findOne({
        senderId:userId,
        receiverId: targetUser._id
    });

    if (invitationAlreadyReceived){
        return res.status(409).send('La invitación ya fue enviada');
    }

    //check if the user which we would like to invite is already our friend
    const usersAlreadyFriends=targetUser.friends.find(friendId=>
        friendId.toString()===userId.toString()
    );

    if(usersAlreadyFriends){
        return res
        .status(409)
        .send('Este usuario ya es tu amigo. Por favor revise la lista de amigos');
    }

     //create new invitation in database
    const newInvitation=await friendInvitation.create({
        senderId:userId,
        receiverId:targetUser._id,
    });

    const history = await History.create({
        userId:userId,
        action:'Send friend invitation',
    });

    //update friendInvitations

    //send pending invitations update to specific user
    friendsUpdates.updateFriendsPendingInvitations(targetUser._id.toString());

    return res.status(201).send('La invitación fue envíada');
};

module.exports=postInvite;