import React from 'react';
import {styled} from '@mui/system';
import FriendsListItem from './FriendsListItem';
import {connect} from 'react-redux';

const MainContainer=styled("div")({
    flexGrow:1,
    width:"100%",
});

const checkOnlineUsers=(friends=[], onlineUsers=[])=>{
    friends.forEach(f=>{//Comparamos la lista de amigos con los usuarios que están en línea
        const isUserOnline=onlineUsers.find(user=>user.userId===f.id);
        f.isOnline=isUserOnline?true:false;
    });

    return friends;
};

const checkInCallUsers=(friends=[], activeRooms=[])=>{
    friends.forEach(f=>{//Comparamos la lista de amigos con los usuarios que están en línea
        // Check if the user is in an active call
        const isInCall = activeRooms.some((room) => room.roomCreator.userId === f.id && room.chatType==='DIRECT');

        // Update the isInCall property
        f.isInCall = isInCall;
    });

    return friends;
};
//Traemos la lista de amigos y la lista de usuarios en línea
const FriendsList = ({friends, onlineUsers, activeRooms}) => {
    const friendsWithStatus = checkInCallUsers(checkOnlineUsers(friends, onlineUsers), activeRooms);
    
    return (
        <MainContainer>
            {friendsWithStatus.map((f)=>(
                <FriendsListItem
                    username={f.username}
                    id={f.id}
                    key={f.id}
                    isOnline={f.isOnline}
                    isInCall={f.isInCall}
                />
            ))}
        </MainContainer>
    );
};

//Treaemos el objeto friends desde el estado global
const mapStoreStateToProps=({friends,room})=>{
    return {
        ...friends,
        ...room,
    };
};

export default connect(mapStoreStateToProps)(FriendsList);