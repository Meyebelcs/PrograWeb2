import React from 'react';
import {styled} from '@mui/system';
import AddGroupButton from './AddGroupButton';
import GroupsTitle from './GroupsTitle';
import GroupsList from './GroupsList/GroupsList';

const MainContainer=styled('div')({
    marginLeft:'10px',
    marginRight:'5px',
    width:'224px',
    height:'100%',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    //backgroundColor:'#2F3136'
    backgroundColor:"rgba(255, 255, 255,0.1)",
    borderRadius:"20px",
});

const GroupsSideBar = () => {
    return <MainContainer>
        <AddGroupButton/>
        <GroupsTitle title='Grupos'/>
        <GroupsList/>
    </MainContainer>;
};

export default GroupsSideBar;