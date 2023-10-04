import React, {useEffect, useState} from 'react';
import { Dialog, Typography } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import InputWithLabel from '../../shared/components/InputWithLabel';
import CustomPrimaryButton from '../../shared/components/CustomPrimaryButton';

const AddFriendDialog = ({
    isDialogOpen,
    closeDialogHandler,
    sendFriendInvitation=()=>{}
}) => {

    const [mail,setMail]=useState('');
    const [isFormValid,setIsFormValid]=useState('');

    const handleSendInvitation=()=>{
        //send friend request to server
    }

    const handleCloseDialog=()=>{
        closeDialogHandler();
        setMail('');
    };

    useEffect(()=>{

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
                        label='Send'
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

export default AddFriendDialog;