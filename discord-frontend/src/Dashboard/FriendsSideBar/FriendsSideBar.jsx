import React from 'react';
import {styled} from '@mui/system';
import AddFriendButton from './AddFriendButton';
import FriendsTitle from './FriendsTitle';
import FriendsList from './FriendsList/FriendsList';
import PendingInvitationsList from './PendingInvitationsList/PendingInvitationsList';

const MainContainer=styled('div')({
    marginLeft:'10px',
    marginRight:'5px',
    width:'224px',
    height:'100%',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    //backgroundColor:'#2F3136'
    backgroundColor:"rgba(255, 255, 255,0.1)",
    borderRadius:"20px",
});

const FriendsSideBar = () => {
    return <MainContainer>
        <AddFriendButton/>
        <FriendsTitle title='Mensajes privados' />
        <FriendsList/>
        <FriendsTitle title='Invitaciones'/>
        <PendingInvitationsList/>
    </MainContainer>;
};

export default FriendsSideBar;