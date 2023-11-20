const Group = require('../../models/group');
const groupsUpdate = require('../../socketHandlers/updates/groups');
const mongoose = require('mongoose');

const postGroup  =async (req, res)=> {

    const {participants, name}=req.body;

    if(participants.length<2){
        return res.status(400).send('No hay suficientes usuarios para crear el grupo');
    }

    if(name.length<3){
        return res.status(400).send('El nombre del grupo no contiene suficientes caracteres');
    }

    const {userId}=req.user;

    console.log(userId);

    const participantIds = participants.map((participantId) => new mongoose.Types.ObjectId(participantId));
    participantIds.push(new mongoose.Types.ObjectId(userId));

    const group = await Group.create({
        name: name,
        participants: participantIds,
        messages:[],
    });

    for (const participantId of participantIds) {
        groupsUpdate.updateGroups(participantId.toString());
    };

    return res.status(201).send('El grupo fue creado');
};

module.exports = postGroup;