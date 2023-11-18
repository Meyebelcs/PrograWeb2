import React, { useState } from 'react';
import { styled } from '@mui/system';
import { connect } from 'react-redux';
import {FormControlLabel, Icon, IconButton } from '@mui/material';
import { sendDirectMessage, sendGroupMessage, sendSubgroupMessage } from '../../realtimeCommunication/socketConnection';
import { uploadFile } from '../../Firebase/config';
import AttachFileIcon from '@mui/icons-material/AttachFile';

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
            console.log(file.type);
            try{
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
                console.log(result);
            }catch(error){
                console.log(error);
            }
           
        }
    };

    return (
        <MainContainer>
            <Input
                placeholder={`Write message to ${chosenChatDetails.name}`}
                value={message}
                onChange={handleMessageValueChange}
                onKeyDown={handleKeyPressed}
            />
            <IconButton onClick={()=>document.querySelector(".attachFile").click()}><AttachFileIcon/></IconButton>
            <input className='attachFile' hidden type={"file"} accept=".pdf, image/*" onChange={e=>validateFile(e.target.files[0])}></input>
        </MainContainer>
    );
};

const mapStoreStateToProps = ({ chat }) => {
    return {
        ...chat,
    };
};

export default connect(mapStoreStateToProps)(NewMessageInput);