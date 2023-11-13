import React, {useState} from 'react';
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

    const [expandedPanel, setExpandedPanel] = useState(null);

    const handleAccordionChange = (panel) => {
        setExpandedPanel(expandedPanel === panel ? null : panel);
    };

    return (
        <MainContainer>
            {groups.map((g)=>(
                <GroupsListItem
                    groupName={g.name}
                    participants={g.participants}
                    subgroups={g.subgroups}
                    id={g.id}
                    key={g.id}
                    expanded={expandedPanel === `panel-${g.id}`}
                    onAccordionChange={() => handleAccordionChange(`panel-${g.id}`)}
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