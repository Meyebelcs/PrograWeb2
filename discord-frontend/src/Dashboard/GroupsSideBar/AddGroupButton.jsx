import React, {useState} from 'react';
import CustomPrimaryButton from '../../shared/components/CustomPrimaryButton';
import AddGroupDialog from './AddGroupDialog';

const additionalStyles={
    marginTop:'10px',
    marginLeft:'5px',
    width:'80%',
    height:'30px',
    background:'#3ba55d'
}

const AddGroupButton = () => {

    const [isDialogOpen, SetIsDialogOpen]=useState(false);

    const handleOpenAddGroupDialog=()=>{
        SetIsDialogOpen(true);
    };

    const handleCloseAddGroupDialog=()=>{
        SetIsDialogOpen(false);
    };

    return (
        <>
           <CustomPrimaryButton
                additionalStyles={additionalStyles}
                label='Crear grupo'
                onClick={handleOpenAddGroupDialog}
           /> 
           <AddGroupDialog
            isDialogOpen={isDialogOpen}
            closeDialogHandler={handleCloseAddGroupDialog}
           />
        </>
    );
};

export default AddGroupButton;