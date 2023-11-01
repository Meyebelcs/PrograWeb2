import React, {useState} from 'react';
import CustomPrimaryButton from '../../../shared/components/CustomPrimaryButton';
import AddSubgroupDialog from './AddSubgroupDialog';

const additionalStyles={
    marginTop:'5px',
    marginLeft:'20px',
    fontSize:'15px',
    width:'80%',
    height:'20px',
    background:'#3ba55d'
}

const AddSubgroupButton = () => {

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
                label='Crear Subgrupo'
                onClick={handleOpenAddGroupDialog}
           /> 
           <AddSubgroupDialog
            isDialogOpen={isDialogOpen}
            closeDialogHandler={handleCloseAddGroupDialog}
           /> 
        </>
    );
};

export default AddSubgroupButton;