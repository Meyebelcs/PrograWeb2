import { Box, Tooltip, Typography } from '@mui/material';
import Avatar from '../../../shared/components/Avatar'
import React, {useState} from 'react';
import InvitationDecisionButtons from './InvitationDecisionButtons';
import {connect} from 'react-redux';
import {getActions} from '../../../store/actions/friendsActions';

const PendingInvitationsListItem = ({
    id,
    username,
    mail,
    acceptFriendInvitation =()=>{}, //Traemos las funciones para aceptar y rechazar invitaciones 
    rejectFriendInvitation=()=>{},
}) => {
    const [buttonDisabled, setButtonsDisabled]=useState(false);

    const handleAcceptInvitation=()=>{
        acceptFriendInvitation({id});
        setButtonsDisabled(true); //Desactivamos los botones si aceptamos la invitación
    }

    const handleRejectInvitation=()=>{
        rejectFriendInvitation({id});
        setButtonsDisabled(true); //Desactivamos los botones si rechazamos la invitación
    }

    return (
        <Tooltip
            title={mail}
        >
            <div style={{width:'100%'}}>
                <Box
                    sx={{
                        width:'100%',
                        height:'42px',
                        marginTop:'10px',
                        display:'flex',
                        alignItems:'center',
                        justifyContent:'space-between',   
                    }}
                >
                    <Avatar username={username}/>
                    <Typography
                        sx={{
                            marginLeft:'7px',
                            fontWeight:700,
                            color:'#8e9297',
                            flexGrow:1,
                        }}
                        variant='subtitle1'
                    >{username}</Typography>
                    <InvitationDecisionButtons
                        disabled={buttonDisabled}
                        acceptInvitationHandler={handleAcceptInvitation}
                        rejectInvitationHandler={handleRejectInvitation}
                    />
                </Box>
            </div>
        </Tooltip>
    );
};

//Traemos las acciones desde la store
const mapActionsToProps=(dispatch)=>{
    return{
        ...getActions(dispatch),
    };
};

export default connect(null,mapActionsToProps)(PendingInvitationsListItem);