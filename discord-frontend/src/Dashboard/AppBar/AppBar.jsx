import React from 'react';
import {styled} from '@mui/system';
import DropdownMenu from './DropdownMenu';

const MainContainer=styled('div')({
    position:'absolute',
    right:'0',
    top:'0',
    height:'48px',
    borderBottom:'1px solid black',
    /* backgroundColor:'#36393f', */
    backgroundColor:"rgba(255, 255, 255,0.1)",
    width:'calc(100% - 346px)',
    display:'flex',
    alignItems:'center',
    justifyContent:'space-between',
    padding:'0 15px',
    borderRadius:"10px",
    //marginTop:"10px"
})

const AppBar = () => {
    return <MainContainer>
        <DropdownMenu/>
    </MainContainer>
};

export default AppBar;