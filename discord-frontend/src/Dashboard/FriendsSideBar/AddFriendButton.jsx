import React, {useState} from 'react';
import CustomPrimaryButton from '../../shared/components/CustomPrimaryButton';
import AddFriendDialog from './AddFriendDialog';

const additionalStyles={
    marginTop:'10px',
    marginLeft:'5px',
    width:'80%',
    height:'30px',
    background:'#3ba55d'
}

const AddFriendButton = () => {

    const [isDialogOpen, SetIsDialogOpen]=useState(false);

    const handleOpenAddFriendDialog=()=>{
        SetIsDialogOpen(true);
    };

    const handleCloseAddFriendDialog=()=>{
        SetIsDialogOpen(false);
    };

    return (
        <>
            <CustomPrimaryButton
                additionalStyles={additionalStyles}
                label='Agregar Amigo'
                onClick={handleOpenAddFriendDialog}
            />
            <AddFriendDialog
                isDialogOpen={isDialogOpen}
                closeDialogHandler={handleCloseAddFriendDialog}
            />
        </>
    );
};

export default AddFriendButton;