import React, { useEffect, useState } from 'react';
import {styled} from '@mui/system';
import SideBar from './SideBar/SideBar';
import FriendsSideBar from './FriendsSideBar/FriendsSideBar';
import Messenger from './Messenger/Messenger';
import AppBar from './AppBar/AppBar';
import { logout } from '../shared/utils/auth';
import {connect} from 'react-redux';
import { getActions } from '../store/actions/authActions';
import GroupsSideBar from './GroupsSideBar/GroupsSideBar';

const Wrapper = styled('div')({
    width:'100%',
    height:'100vh',
    display:'flex',
    backgroundImage: 'linear-gradient(#2A00B7 0%, #42006C 100%)'
});

const Dashboard = ({setUserDetails}) => {
    
    const [showPrivateChats, setShowPrivateChats] = useState(true);

    useEffect(()=>{
        const userDetails=localStorage.getItem('user');

        if(!userDetails){
            logout();
        }else{
           setUserDetails(JSON.parse(userDetails)); 
        }
    },[])
    
    return <Wrapper>
        <SideBar
            onPrivateChatsClick={() => setShowPrivateChats(true)}
            onGroupChatsClick={() => setShowPrivateChats(false)}
        />
        {showPrivateChats ? <FriendsSideBar /> : <GroupsSideBar />}
        <Messenger/>
        <AppBar/>
    </Wrapper>;
};

const mapActionsToProps=(dispatch)=>{
    return{
        ...getActions(dispatch),
    };
};

export default connect(null,mapActionsToProps)(Dashboard);