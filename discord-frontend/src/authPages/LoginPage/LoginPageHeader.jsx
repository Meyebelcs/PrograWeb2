import React from 'react';
import { Typography } from '@mui/material';
import { styled } from '@mui/system';

const Wrapper= styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '9px',
    width: '100%',
})

const Underline= styled('div')({
    width:'61px',
    height:'6px',
    background:'#3c009d',
    borderRadius:'9px',
})

const LoginPageHeader = () => {
    return (
        <Wrapper>
            <Typography cariant="h5" sx={{color:"#3c009d", fontSize:"48px", fontWeight:700}}>
                Login
            </Typography>
            <Underline/>
        </Wrapper>
    );
};

export default LoginPageHeader;