import React, { useState, useRef } from 'react';
import { styled } from '@mui/system';
import { connect } from 'react-redux';
import {FormControlLabel, Icon, IconButton } from '@mui/material';
import { sendDirectMessage, sendGroupMessage, sendSubgroupMessage } from '../../realtimeCommunication/socketConnection';
import { uploadFile } from '../../Firebase/config';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import {openAlertMessage} from "../../store/actions/alertActions"
import { useDispatch } from 'react-redux';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const MainContainer = styled("div")({
    height: "60px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
});

const Input = styled('input')({
    backgroundColor: '#390085',
    width: '98%',
    height:'44px',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    padding: '0 10px',
});


const NewMessageInput = ({ chosenChatDetails, chatType }) => {
    const [message, setMessage] = useState("");
    const [location, setLocation] = useState(null);
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);

    const handleMessageValueChange = (event) => {
        setMessage(event.target.value);
    };

    const handleKeyPressed = (event) => {
        if (event.key === "Enter") {
            handleSendMessage();
        }
    };

    const handleSendMessage = () => {

        if(message.length>0){
            if(chatType=='DIRECT'){
                sendDirectMessage({
                    receiverUserId: chosenChatDetails.id,
                    content: message,
                    contentType:'text',
                    filename:'',
                });
            }else if(chatType=='GROUP'){
                sendGroupMessage({
                    groupId: chosenChatDetails.id,
                    content: message,
                    contentType:'text',
                    filename:'',
                });
            }else if(chatType=='SUBGROUP'){
                sendSubgroupMessage({
                    subgroupId: chosenChatDetails.id,
                    content: message,
                    contentType:'text',
                    filename:'',
                });
            }
            
            setMessage("");
        }
    };

    const validateFile= async(file)=>{
        if(file){
            const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
            
            try{
                if (allowedTypes.includes(file.type)) {
                    const result= await uploadFile(file);
                    if(chatType=='DIRECT'){
                        sendDirectMessage({
                            receiverUserId: chosenChatDetails.id,
                            content: result,
                            contentType:file.type,
                            filename:file.name,
                        });
                    }else if(chatType=='GROUP'){
                        sendGroupMessage({
                            groupId: chosenChatDetails.id,
                            content: result,
                            contentType:file.type,
                            filename:file.name,
                        });
                    }else if(chatType=='SUBGROUP'){
                        sendSubgroupMessage({
                            subgroupId: chosenChatDetails.id,
                            content: result,
                            contentType:file.type,
                            filename:file.name,
                        });
                    }
                    fileInputRef.current.value = '';
                }else{
                    dispatch(openAlertMessage('Lo siento, solo se permiten archivos PDF e imágenes (JPEG, PNG). Por favor, seleccione un archivo válido.'));
                    fileInputRef.current.value = '';
                }
            }catch(error){
                console.log(error);
            }
           
        }
    };

    const handleLocation = () => {
        console.log(navigator.geolocation);
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
              });
              console.log(position);
              constructMapLink();
            },
            (error) => {
              console.error('Error retrieving location:', error);
            }
          );
        } else {
          console.error('Geolocation is not supported by this browser.');
        }
    };

    const constructMapLink = () => {
        if (location) {
            console.log(location);
          const { latitude, longitude } = location;
          if(chatType=='DIRECT'){
                sendDirectMessage({
                    receiverUserId: chosenChatDetails.id,
                    content: `https://www.google.com/maps?q=${latitude},${longitude}`,
                    contentType:'location',
                    filename:'',
                });
            }else if(chatType=='GROUP'){
                sendGroupMessage({
                    groupId: chosenChatDetails.id,
                    content: `https://www.google.com/maps?q=${latitude},${longitude}`,
                    contentType:'location',
                    filename:'',
                });
            }else if(chatType=='SUBGROUP'){
                sendSubgroupMessage({
                    subgroupId: chosenChatDetails.id,
                    content: `https://www.google.com/maps?q=${latitude},${longitude}`,
                    contentType:'location',
                    filename:'',
                });
            }
        }
        return null;
    };

    return (
        <MainContainer>
            <Input
                placeholder={`Escrir mensaje a ${chosenChatDetails.name}`}
                value={message}
                onChange={handleMessageValueChange}
                onKeyDown={handleKeyPressed}
            />
            <IconButton onClick={()=>document.querySelector(".attachFile").click()}><AttachFileIcon/></IconButton>
            <input className='attachFile' hidden type={"file"} accept=".pdf, image/*" ref={fileInputRef} onChange={e=>validateFile(e.target.files[0])}></input>
            <IconButton onClick={handleLocation}><LocationOnIcon/></IconButton>
        </MainContainer>
    );
};

const mapStoreStateToProps = ({ chat }) => {
    return {
        ...chat,
    };
};

export default connect(mapStoreStateToProps)(NewMessageInput);