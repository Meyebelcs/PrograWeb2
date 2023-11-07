import React, {useState} from 'react';
import IconButton from '@mui/material/IconButton';
import VideoCamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';


const CameraButton = () => {
    const [cameraEnabled, setCameraEnabled] = useState (true);

    const handleToggleCamera = () => {
        setCameraEnabled(!cameraEnabled);
    }

    return (
        <IconButton onClick={handleToggleCamera} style={{color: 'white'}}>
            {cameraEnabled ? <VideoCamIcon /> : <VideocamOffIcon/>}
        </IconButton>
    );
};

export default CameraButton;