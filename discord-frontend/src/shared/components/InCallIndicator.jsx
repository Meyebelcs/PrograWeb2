import React from 'react';
import {Box} from '@mui/material';
import FiberManualRecordIcon  from '@mui/icons-material/FiberManualRecord'

const InCallIndicator = () => {
    return (
        <Box
            sx={{
                color:'red',
                display:'flex',
                alignItems:'center',
                position:'absolute',
                right:'5px'
            }}
        >
            <FiberManualRecordIcon/>
        </Box>
    );
};

export default InCallIndicator;