import React from 'react';
import {styled} from '@mui/system';
import Button from '@mui/material/Button';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import CreateRoomButton from './CreateRoomButton';
import { connect } from 'react-redux';
import Avatar from '../../shared/components/Avatar';
import { Tooltip } from '@mui/material';
import * as roomHandler from '../../realtimeCommunication/roomHandler';

//import MainPageButton from './MainPageButton';

const MainContainer=styled('div')({
    width:'72px',
    height:'100%',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    //backgroundColor:'#202225'
    backgroundColor:"rgba(255, 255, 255,0.1)",
    borderRadius:"20px",
});

const ActiveRoomButton = ({
    creatorUsername,
    roomId,
    amountOfParticipants,
    isUserInRoom,
}) => {
    const handleJoinActiveRoom = () => {
        if(amountOfParticipants < 4){
            roomHandler.joinRoom(roomId);
        }
    }

    const activeRoomButtonDisabled = amountOfParticipants > 3;
    const roomTitle = `Cretor: ${creatorUsername}. Connected: ${amountOfParticipants}`;

    return <Tooltip title={roomTitle}>
        <div>
            <Button
                style={{
                    width:'48px',
                    height:'48px',
                    borderRadius:'16px',
                    margin:0,
                    padding:0,
                    minWidth:0,
                    marginTop:'10px',
                    color:'white',
                    backgroundColor:'#5865F2'
                }}
                disabled={activeRoomButtonDisabled || isUserInRoom}
                onClick={handleJoinActiveRoom}
            >
                <Avatar username={creatorUsername} />
            </Button>
        </div>
    </Tooltip>
};

const SideBar = ({ activeRooms, isUserInRoom, onPrivateChatsClick, onGroupChatsClick }) => {
    return (
        <MainContainer>
            <Button
                style={({
                    width:'48px',
                    height:'48px',
                    borderRadius:'16px',
                    margin:0,
                    padding:0,
                    minWidth:0,
                    marginTop:'10px',
                    color:'white',
                    backgroundColor:'#5865F2'
                })}
                onClick={onPrivateChatsClick}
            >
            <PersonIcon/>  
            </Button>
            <Button
                style={({
                    width:'48px',
                    height:'48px',
                    borderRadius:'16px',
                    margin:0,
                    padding:0,
                    minWidth:0,
                    marginTop:'10px',
                    color:'white',
                    backgroundColor:'#5865F2'
                })}
                onClick={onGroupChatsClick}
            >
            <GroupsIcon/>  
            </Button>
            <CreateRoomButton isUserInRoom={isUserInRoom}/>
            {activeRooms.map(room => (
                <ActiveRoomButton 
                    roomId={room.roomId}
                    creatorUsername={room.creatorUsername}
                    amountOfParticipants={room.participants.length}
                    key={room.roomId}
                    isUserInRoom={isUserInRoom}
                />
            ))}
        </MainContainer>

    );
};

const mapStoreStateToProps = ({ room }) => {
    return {
        ...room,
    };
};

export default connect(mapStoreStateToProps)(SideBar);