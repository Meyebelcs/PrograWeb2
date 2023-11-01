import React from 'react';
import Button from '@mui/material/Button';
import Avatar from '../../../shared/components/Avatar';
import Typography from '@mui/material/Typography';
import { chatTypes, getActions } from "../../../store/actions/chatActions";
import { connect } from 'react-redux';

const SubgroupListItem = ({ id, name, setChosenChatDetails }) => {
    
    const handleChoosenActiveConversation = () => {//Mandamos a guardar los datos de la conversación seleccionada
        setChosenChatDetails({ id: id, name: name }, chatTypes.SUBGROUP);
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
            <Avatar username={name} />
            <Typography
                style={{
                    marginLeft: '7px',
                    fontWeight: 700,
                    color: '#8e9297'
                }}
                variant='subtitle1'
                align='left'
            >
                {name}
            </Typography>
        </Button>
    );
};

//Traemos las acciones de la store
const mapActionsToProps = (dispatch) => {
    return {
        ...getActions(dispatch),
    };
};

export default connect(null, mapActionsToProps)(SubgroupListItem);