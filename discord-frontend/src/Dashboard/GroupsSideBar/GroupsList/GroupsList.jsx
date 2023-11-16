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

const checkInCallGroups=(groups=[], activeRooms=[])=>{
    groups.forEach(g=>{//Comparamos la lista de amigos con los usuarios que están en línea
        // Check if the user is in an active call
        const isInCall = activeRooms.some((room) => room.chatId === g.id && room.chatType==='GROUP');

        // Update the isInCall property
        g.isInCall = isInCall;
    });

    return groups;
};

const GroupsList = ({groups, activeRooms}) => {

    const [expandedPanel, setExpandedPanel] = useState(null);

    const handleAccordionChange = (panel) => {
        setExpandedPanel(expandedPanel === panel ? null : panel);
    };

    return (
        <MainContainer>
            {checkInCallGroups(groups, activeRooms).map((g)=>(
                <GroupsListItem
                    groupName={g.name}
                    isInCall={g.isInCall}
                    participants={g.participants}
                    subgroups={g.subgroups}
                    id={g.id}
                    key={g.id}
                    expanded={expandedPanel === `panel-${g.id}`}
                    onAccordionChange={() => handleAccordionChange(`panel-${g.id}`)}
                    activeRooms={activeRooms}
                />
            ))}
        </MainContainer>
    );
};

const mapStoreStateToProps=({groups,room})=>{
    return {
        ...groups,
        ...room,
    };
};

export default connect(mapStoreStateToProps)(GroupsList);