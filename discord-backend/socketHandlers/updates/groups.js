const User = require('../../models/user');
const Group = require('../../models/group');
const serverStore = require('../../serverStore');

const updateGroups = async (userId) => {
    try{
        //find active connections of specific id (online users)
        const receiverList = serverStore.getActiveConnections(userId);

        if(receiverList.length > 0){

            const groups = await Group.find({ participants: userId })
            .populate('participants', '_id username mail')
            .populate('subgroups', 'name participants');;

            if(groups){

                const groupsList = groups.map(group => {
                    // Mapping participants and renaming _id to id
                    const participants = group.participants.map(participant => ({
                      id: participant._id,
                      username: participant.username,
                      mail: participant.mail,
                    }));
                
                    // Filtering out the user with _id equal to userId
                    const filteredParticipants = participants.filter(participant => participant.id.toString() !== userId.toString());
                
                    return {
                      id: group._id,
                      name: group.name,
                      participants: filteredParticipants,
                      subgroups:group.subgroups,
                    };
                  });

                //get io server instance
                const io = serverStore.getSocketServerInstance();

                receiverList.forEach(receiverSocketId =>{
                    io.to(receiverSocketId).emit('groups-list', {
                        groups: groupsList ? groupsList : [],
                    });
                });
            }
        }
    }catch (err){
        console.log(err);
    }
};

module.exports ={
    updateGroups,
};