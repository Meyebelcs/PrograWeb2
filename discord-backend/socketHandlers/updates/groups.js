const User = require('../../models/user');
const Group = require('../../models/group');
const serverStore = require('../../serverStore');

const updateGroups = async (userId) => {
    try{
        //find active connections of specific id (online users)
        const receiverList = serverStore.getActiveConnections(userId);

        if(receiverList.length > 0){

            const groups = await Group.find({ participants: userId });

            if(groups){
                const groupsList = groups.map(g => {
                    return {
                        id: g._id,
                        name: g.name,
                        participants:g.participants
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