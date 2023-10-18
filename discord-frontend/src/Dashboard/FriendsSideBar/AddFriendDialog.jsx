import React, {useEffect, useState} from 'react';
import { Dialog, Typography } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import InputWithLabel from '../../shared/components/InputWithLabel';
import CustomPrimaryButton from '../../shared/components/CustomPrimaryButton';
import {connect} from 'react-redux';    
import { getActions } from '../../store/actions/friendsActions';

const AddFriendDialog = ({
    isDialogOpen,
    closeDialogHandler,
    sendFriendInvitation=()=>{} //Esta función viene de la store
}) => {

    const [mail,setMail]=useState('');
    const [isFormValid,setIsFormValid]=useState('');

    const handleSendInvitation=()=>{
        sendFriendInvitation({
            targetMailAddress:mail,
        },handleCloseDialog);
    }

    const handleCloseDialog=()=>{
        closeDialogHandler();
        setMail('');
    };

    useEffect(()=>{ //Observa cambios en la variable mail y revisa si es va´lido

        setIsFormValid(validateMail(mail));
        
    },[mail, setIsFormValid]);

    const validateMail=(mail)=>{
        if(!mail.match('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')){
            return false;
        }else{
            return true;
        }

    };

    return (
        <div>
            <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
                <DialogTitle><Typography>Añade un amigo</Typography></DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography>
                            Ingresa el correo eletrónico del amigo que deseas agregar
                        </Typography>
                    </DialogContentText>
                    <InputWithLabel
                        label='Correo electrónico'
                        type='text'
                        value={mail}
                        setValue={setMail}
                        placeholder='Ingresa un correo electrónico'
                    />
                </DialogContent>
                <DialogActions>
                    <CustomPrimaryButton
                        onClick={handleSendInvitation}
                        disabled={!isFormValid}
                        label='Enviar'
                        additionalStyles={{
                            marginLeft:'15px',
                            marginRight:'15px',
                            marginBottom:'10px',
                        }}
                    />
                </DialogActions>
            </Dialog>
        </div>
    );
};

//Traemos las acciones del store para poderlas usar en el componente
const mapActionsToProps=(dispatch)=>{
    return{
        ...getActions(dispatch),
    };
};

//Connect conecta el componente a la store
export default connect(null, mapActionsToProps)(AddFriendDialog);