import React from 'react';
import Box from '@mui/material/Box';
import {styled} from '@mui/system';

const BoxWrapper= styled('div')({
    width:'100%',
    height:'100vh',
    display: 'flex',
    alignItems:'center',
    justifyContent:'center',
    background:'linear-gradient(#2A00B7, #42006C);'
})

const AuthBox = (props) => {
    return (
        <BoxWrapper>
            <Box
                sx={{
                    width:"600px",
                    bgcolor:'#fff',
                    borderRadius:'5px',
                    boxShadow:'0 2px 10px 0 rgb(0 0 0/20%)',
                    display:'flex',
                    flexDirection:'column',
                    padding:"25px",
                    margin:"auto",
                }}
            >
                {props.children}
            </Box>
        </BoxWrapper>
    );
};

export default AuthBox;