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
//Traemos la lista de amigos y la lista de usuarios en línea
const FriendsList = ({friends, onlineUsers}) => {
    return (
        <MainContainer>
            {checkOnlineUsers(friends,onlineUsers).map((f)=>(
                <FriendsListItem
                    username={f.username}
                    id={f.id}
                    key={f.id}
                    isOnline={f.isOnline}
                />
            ))}
        </MainContainer>
    );
};

//Treaemos el objeto friends desde el estado global
const mapStoreStateToProps=({friends})=>{
    return {
        ...friends,
    };
};

export default connect(mapStoreStateToProps)(FriendsList);