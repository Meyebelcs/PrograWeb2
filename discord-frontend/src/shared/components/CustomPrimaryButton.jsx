import React from 'react';
import Button from '@mui/material/Button';

const CustomPrimaryButton = ({
    label,
    additionalStyles,
    disabled,
    onClick,
}) => {
    return (
        <Button
        variant='contained'
        sx={{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            width:'100%',
            height:'59px',
            color:'#fff',
            bgcolor:'#4c00b4',
            borderRadius:'50px',
            fontSize:'19px',
            fontWeight:'700',
            cursor:'pointer',
            textTransform:'none',
        }}
        style={additionalStyles?additionalStyles:{}}
        disabled={disabled}
        onClick={onClick}
        >
            {label}
        </Button>
    );
};

export default CustomPrimaryButton;