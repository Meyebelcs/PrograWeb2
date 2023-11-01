import React, {useEffect, useState} from 'react';
import { Dialog, Typography } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import InputWithLabel from '../../../shared/components/InputWithLabel';
import CustomPrimaryButton from '../../../shared/components/CustomPrimaryButton';
import MultipleSelectCheckmarks from '../MultipleSelect';
import {connect} from 'react-redux';  
import { getActions } from '../../../store/actions/groupsActions';  

const AddSubgroupDialog = ({
    chosenGroup,
    isDialogOpen,
    closeDialogHandler,
    createSubgroup=()=>{}
}) => {
    const [name,setName]=useState('');
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [isFormValid,setIsFormValid]=useState('');

    const handleCreateSubgroup=()=>{
        createSubgroup({
                groupId:chosenGroup.id,
                name: name,
                participants: selectedUsers
            }, handleCloseDialog);
    };

    const handleCloseDialog=()=>{
        closeDialogHandler();
        setName('');
        setSelectedUsers([]);
    };

    useEffect(()=>{

        setIsFormValid(validateMail(name) && validateUsers(selectedUsers));
        
    },[name, selectedUsers, setIsFormValid]);

    const validateMail=(name)=>{
        if(name.length>=3){
            return true;
        }else{
            return false;
        }

    };

    const validateUsers=(users)=>{
        if(users.length>=2){
            return true;
        }else{
            return false;
        }

    };

    return (
        <div>
            <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
                <DialogTitle><Typography>Crear subgrupo</Typography></DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography>
                            Ingresa el nombre del grupo
                        </Typography>
                    </DialogContentText>
                    <InputWithLabel
                        label='Nombre'
                        type='text'
                        value={name}
                        setValue={setName}
                        placeholder='Ingresa un nombre'
                    />
                    {chosenGroup && <MultipleSelectCheckmarks friends={chosenGroup.participants} setSelectedUsers={setSelectedUsers}/>}
                </DialogContent>
                <DialogActions>
                    <CustomPrimaryButton
                        onClick={handleCreateSubgroup}
                        disabled={!isFormValid}
                        label='Enviar'
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

const mapStoreStateToProps=({chat})=>{
    return {
        ...chat,
    };
};

const mapActionsToProps=(dispatch)=>{
    return{
        ...getActions(dispatch),
    };
};

export default connect(mapStoreStateToProps,mapActionsToProps)(AddSubgroupDialog);