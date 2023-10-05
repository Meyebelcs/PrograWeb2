import React from 'react';
import {styled} from '@mui/system';

const MainContainer=styled('div')({
    flexGrow:1,
    //backgroundColor:'#36393f',
    marginLeft:'5px',
    marginTop:'48px',
    display:'flex',
    backgroundColor:"rgba(255, 255, 255,0.1)",
    borderRadius:"20px",
});

const Messenger = () => {
    return <MainContainer></MainContainer>
};

export default Messenger;