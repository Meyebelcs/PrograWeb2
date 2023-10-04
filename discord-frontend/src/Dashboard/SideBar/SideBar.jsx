import React from 'react';
import {styled} from '@mui/system';
import MainPageButton from './MainPageButton';
import Button from '@mui/material/Button';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';

const MainContainer=styled('div')({
    width:'72px',
    height:'100%',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    //backgroundColor:'#202225'
    backgroundColor:"rgba(255, 255, 255,0.1)",
    borderRadius:"20px",
})

const SideBar = ({ onPrivateChatsClick, onGroupChatsClick }) => {
    return (
        <MainContainer>
            <Button
                style={({
                    width:'48px',
                    height:'48px',
                    borderRadius:'16px',
                    margin:0,
                    padding:0,
                    minWidth:0,
                    marginTop:'10px',
                    color:'white',
                    backgroundColor:'#5865F2'
                })}
                onClick={onPrivateChatsClick}
            >
            <PersonIcon/>  
            </Button>
            <Button
                style={({
                    width:'48px',
                    height:'48px',
                    borderRadius:'16px',
                    margin:0,
                    padding:0,
                    minWidth:0,
                    marginTop:'10px',
                    color:'white',
                    backgroundColor:'#5865F2'
                })}
                onClick={onGroupChatsClick}
            >
            <GroupsIcon/>  
            </Button>
        </MainContainer>
    );
};

export default SideBar;