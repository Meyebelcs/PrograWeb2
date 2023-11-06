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
import { connectWithSocketServer } from '../realtimeCommunication/socketConnection';
import Room from './Room/Room';

const Wrapper = styled('div')({
    width:'100%',
    height:'100vh',
    display:'flex',
    backgroundImage: 'linear-gradient(#2A00B7 0%, #42006C 100%)'
});

const Dashboard = ({setUserDetails, isUserInRoom}) => {
    
    const [showPrivateChats, setShowPrivateChats] = useState(true);

    useEffect(()=>{
        const userDetails=localStorage.getItem('user'); //obtenemos el usuario del local storage

        if(!userDetails){ //si no existe cerramos sesión
            logout();
        }else{ //Si sí existe asignamos los datos del usuario en la store
           setUserDetails(JSON.parse(userDetails)); 
           //Pasamos los datos del usuario al socketserver
           connectWithSocketServer(JSON.parse(userDetails));
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
        {isUserInRoom && <Room/>}
    </Wrapper>;
};

const mapStoreStateToProps = ({ room }) => {
    return {
        ...room,
    };
};

const mapActionsToProps=(dispatch)=>{
    return{
        ...getActions(dispatch),
    };
};

export default connect(mapStoreStateToProps,mapActionsToProps)(Dashboard);