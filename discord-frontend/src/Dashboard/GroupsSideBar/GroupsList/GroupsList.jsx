import React from 'react';
import {styled} from '@mui/system';
import GroupsListItem from './GroupsListItem';

const DUMMY_GROUPS = [
    {
        id: 1,
        groupName: 'Grupo1',
    },
    {
        id:2,
        groupName:'Grupo2',
    },
    {
        id:3,
        groupName:'Grupo3',
    }
]

const MainContainer=styled("div")({
    flexGrow:1,
    width:"100%",
});

const GroupsList = () => {
    return (
        <MainContainer>
            {DUMMY_GROUPS.map(f=>(
                <GroupsListItem
                    groupName={f.groupName}
                    id={f.id}
                    key={f.id}
                />
            ))}
        </MainContainer>
    );
};

export default GroupsList;