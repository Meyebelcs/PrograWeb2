import React from 'react';
import {styled} from '@mui/system';
import GroupsListItem from './GroupsListItem';
import {connect} from 'react-redux';

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

const GroupsList = ({groups}) => {
    return (
        <MainContainer>
            {groups.map((g)=>(
                <GroupsListItem
                    groupName={g.name}
                    id={g.id}
                    key={g.id}
                />
            ))}
        </MainContainer>
    );
};

const mapStoreStateToProps=({groups})=>{
    return {
        ...groups,
    };
};

export default connect(mapStoreStateToProps)(GroupsList);