import React from 'react';
import Button from '@mui/material/Button';
import Avatar from '../../../shared/components/Avatar';
import Typography from '@mui/material/Typography';
import { chatTypes, getActions } from "../../../store/actions/chatActions";
import { connect } from 'react-redux';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import AddSubgroupButton from '../SubgroupsSideBar/AddSubgroupButton';
import SubgroupListItem from '../SubgroupsSideBar/SubgroupListItem';

const GroupsListItem = ({ id, groupName, participants, subgroups, expanded, onAccordionChange, setChosenChatDetails, setChosenGroup }) => {
  const handleChoosenActiveConversation = () => {
    setChosenChatDetails({ id: id, name: groupName, participants: participants }, chatTypes.GROUP);
    setChosenGroup({ id, groupName, participants });
  };

  return (
    <Accordion expanded={expanded} onChange={onAccordionChange}
      sx={{
        backgroundColor: 'transparent',
        boxShadow: 'none',
      }}
    >
      <AccordionSummary
        aria-controls={`panel-${id}-content`}
        id={`panel-${id}-header`}
        sx={{
          padding: '0px',
          height: '60px'
        }}
      >
        <Button
          onClick={handleChoosenActiveConversation}
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            textTransform: 'none',
            color: 'black',
            position: 'relative',
          }}
        >
          <Avatar username={groupName} />
          <Typography
            style={{
              marginLeft: '7px',
              fontWeight: 700,
              color: '#8e9297'
            }}
            variant='subtitle1'
            align='left'
          >
            {groupName}
          </Typography>
        </Button>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          backgroundColor: 'rgba(0,0,0,0.1)',
          padding: '0px',
          margin: '0px'
        }}
      >
        <AddSubgroupButton />
        {subgroups.map((g) => (
          <SubgroupListItem
            name={g.name}
            id={g._id}
            key={g._id}
          />
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(null, mapActionsToProps)(GroupsListItem);