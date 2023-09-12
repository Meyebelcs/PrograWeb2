import React from 'react';
import { Typography } from '@mui/material';
import {styled} from "@mui/system";

const RedirectText= styled('span')({
    color:'#4c00b4',
    cursor:'pointer',
});

const RedirectInfo = ({
    text,
    redirectText,
    additionalStyles,
    redirectHandler,
}) => {
    return(
        <Typography
        sx={{color:'#797979', paddingLeft:'62px', marginTop:'27px', fontSize:'18px'}}
        style={additionalStyles?additionalStyles:{}}
        variant="subtitle2"
        >
           {text} 
        <RedirectText onClick={redirectHandler}>
            {redirectText}
        </RedirectText>
        </Typography>
        );
};

export default RedirectInfo;