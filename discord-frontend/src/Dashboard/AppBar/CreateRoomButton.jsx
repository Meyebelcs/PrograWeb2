import React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import VideocamIcon from '@mui/icons-material/Videocam';
import * as roomHandler from '../../realtimeCommunication/roomHandler'; 

const CreateRoomButton = ({ isUserInRoom }) => {
    const createNewRoomHandler = () =>{
        roomHandler.createNewRoom();
    };
    console.log(isUserInRoom);
    return (
        <Button
            disabled={isUserInRoom}
            onClick = {createNewRoomHandler}
            style={({
                width:'48px',
                borderRadius:'16px',
                margin:0,
                padding:0,
                minWidth:0,
                color:'white',
            })}
        >
          <VideocamIcon/>  
        </Button>
    );
};

export default CreateRoomButton;