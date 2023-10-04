import React from 'react';
import Button from '@mui/material/Button';
import Avatar from '../../../shared/components/Avatar';
import Typography from '@mui/material/Typography';

const GroupsListItem = ({id, groupName}) => {
    return (
        <Button
            style={{
                width:'100%',
                height:'42px',
                marginTop:'10px',
                display:'flex',
                alignItems:'center',
                justifyContent:'flex-start',
                textTransform:'none',
                color:'black',
                position:'relative',
            }}
        >
            <Avatar username={groupName} />
            <Typography
                style={{
                    marginLeft:'7px',
                    fontWeight: 700,
                    color:'#8e9297'
                }}
                variant='subtitle1'
                align='left'
            >
                {groupName}
            </Typography>
        </Button>
    );
};

export default GroupsListItem;