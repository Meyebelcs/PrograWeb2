import React from 'react';
import Button from '@mui/material/Button';
import Avatar from '../../../shared/components/Avatar';
import Typography from '@mui/material/Typography';
import OnlineIndicator from './OnlineIndicator';
import InCallIndicator from '../../../shared/components/InCallIndicator';
import { chatTypes, getActions } from "../../../store/actions/chatActions";
import { connect } from 'react-redux';

const FriendsListItem = ({ id, username, isOnline, isInCall, setChosenChatDetails }) => {

    const handleChoosenActiveConversation = () => {//Mandamos a guardar los datos de la conversación seleccionada
        setChosenChatDetails({ id: id, name: username }, chatTypes.DIRECT);
    };

    return (
        <Button
            onClick={handleChoosenActiveConversation}
            style={{
                width: '100%',
                height: '42px',
                marginTop: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                textTransform: 'none',
                color: 'black',
                position: 'relative',
            }}
        >
            <Avatar username={username} />
            <Typography
                style={{
                    marginLeft: '7px',
                    fontWeight: 700,
                    color: '#8e9297'
                }}
                variant='subtitle1'
                align='left'
            >
                {username}
            </Typography>
            {(isInCall && <InCallIndicator/> )|| (isOnline && <OnlineIndicator />)}
        </Button>
    );
};

//Traemos las acciones de la store
const mapActionsToProps = (dispatch) => {
    return {
        ...getActions(dispatch),
    };
};


export default connect(null, mapActionsToProps)(FriendsListItem);