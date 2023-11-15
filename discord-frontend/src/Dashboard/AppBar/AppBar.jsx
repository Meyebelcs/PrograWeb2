import React from 'react';
import {styled} from '@mui/system';
import DropdownMenu from './DropdownMenu';
import ChosenOptionLabel from './ChosenOptionLabel';


const MainContainer=styled('div')({
    position:'absolute',
    right:'0',
    top:'0',
    height:'48px',
    borderBottom:'1px solid black',
    backgroundColor:"rgba(255, 255, 255,0.1)",
    width:'calc(100% - 346px)',
    display:'flex',
    alignItems:'center',
    justifyContent:'space-between',
    padding:'0 15px',
    borderRadius:"10px",
})

const AppBar = () => {
    return <MainContainer>
         <ChosenOptionLabel/>
        <DropdownMenu/>
    </MainContainer>
};

export default AppBar;