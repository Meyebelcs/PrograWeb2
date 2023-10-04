import React, {useEffect, useState} from 'react';
import { Dialog, Typography } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import InputWithLabel from '../../shared/components/InputWithLabel';
import CustomPrimaryButton from '../../shared/components/CustomPrimaryButton';
import MultipleSelectCheckmarks from './MultipleSelect';

const AddGroupDialog = ({
    isDialogOpen,
    closeDialogHandler,
    cretaeGroup=()=>{}
}) => {

    const [mail,setMail]=useState('');
    const [isFormValid,setIsFormValid]=useState('');

    const handleCreateGroup=()=>{
        //create group request to server
    }

    const handleCloseDialog=()=>{
        closeDialogHandler();
        //setMail('');
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
                <DialogTitle><Typography>Crear grupo</Typography></DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography>
                            Ingresa el nombre del grupo
                        </Typography>
                    </DialogContentText>
                    <InputWithLabel
                        label='Nombre'
                        type='text'
                        value={mail}
                        setValue={setMail}
                        placeholder='Ingresa un nombre'
                    />
                    <MultipleSelectCheckmarks/>
                </DialogContent>
                <DialogActions>
                    <CustomPrimaryButton
                        onClick={handleCreateGroup}
                        disabled={!isFormValid}
                        label='Send'
                        additionalStyles={{
                            marginLeft: "15px",
                            marginRight: "15px",
                            marginBottom: "10px",
                            height:'30px',
                            background:'#3ba55d'
                        }}
                    />
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddGroupDialog;