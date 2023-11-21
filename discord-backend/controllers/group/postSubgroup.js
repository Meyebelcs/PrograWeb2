const Subgroup = require('../../models/subgroup');
const Group = require('../../models/group');
const History= require("../../models/history");
const groupsUpdate = require('../../socketHandlers/updates/groups');
const mongoose = require('mongoose');

const postGroup  =async (req, res)=> {

    const {participants, name, groupId}=req.body;

    if(participants.length<2){
        return res.status(409).send('No hay suficientes usuarios para crear el subgrupo');
    }

    if(name.length<3){
        return res.status(409).send('El nombre del subgrupo no contiene suficientes caracteres');
    }

    const {userId}=req.user;

    const participantIds = participants.map((participantId) => new mongoose.Types.ObjectId(participantId));
    participantIds.push(new mongoose.Types.ObjectId(userId));

    const subgroup = await Subgroup.create({
        name: name,
        participants: participantIds,
        messages:[],
    });

    const history = await History.create({
        userId:userId,
        action:'Create subgroup',
    });

    const targetGroup = await Group.findById(groupId);

    if(targetGroup){
        targetGroup.subgroups.push(subgroup._id);
        await targetGroup.save();
    

        for (const participantId of participantIds) {
            groupsUpdate.updateGroups(participantId.toString());
        };
    }

    return res.status(201).send('El grupo fue creado');
};

module.exports = postGroup;