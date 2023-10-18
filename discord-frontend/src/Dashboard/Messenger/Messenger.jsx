import React from 'react';
import { styled } from '@mui/system';
import { connect } from 'react-redux';
import WelcomeMessage from './WelcomeMessage';
import MessengerContent from './MessengerContent';

const MainContainer = styled('div')({
    flexGrow: 1,
    //backgroundColor:'#36393f',
    marginLeft: '5px',
    marginTop: '48px',
    display: 'flex',
    backgroundColor: "rgba(255, 255, 255,0.1)",
    borderRadius: "20px",
});

const Messenger = ({ chosenChatDetails, chatType }) => {
    return (
        <MainContainer>
            {!chosenChatDetails ? (<WelcomeMessage />) : (<MessengerContent chosenChatDetails={chosenChatDetails} chatType={chatType} />)}
        </MainContainer>

    );
};

const mapStoreStateToProps = ({ chat }) => {
    return {
        ...chat,
    };
};

export default connect(mapStoreStateToProps)(Messenger);