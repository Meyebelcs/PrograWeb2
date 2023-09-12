import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import AuthBox from '../../shared/components/AuthBox';
import RegisterPageInputs from './RegisterPageInputs';
import RegisterPageFooter from './RegisterPageFooter';
import RegisterPageHeader from './RegisterPageHeader';
import { connect } from 'react-redux';
import { getActions } from '../../store/actions/authActions';
import { useNavigate } from "react-router-dom";
import { openAlertMessage } from '../../store/actions/alertActions';

const RegisterPage = ({register}) => {

    const navigate= useNavigate();

    const [mail,setMail]=useState("");
    const [username, setUsername]=useState("");
    const [password, setPassword]=useState("");
    const [errorMsg, setMessage]=useState("");
    const [isFormValid,setIsFormValid]=useState(false);

    useEffect(()=>{
        setIsFormValid(validateRegisterForm({mail,username,password}));
    });

    const validateRegisterForm=({mail,username,password})=>{
        if(!mail.match('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')){
            setMessage('El correo no tiene el formato correcto');
            return false;
        }else if(!password.match('^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])(?=.*[a-zA-Z]).{8,}$')){
            setMessage('La contraseña no tiene el formato correcto');
            return false;
        }else if(password.length<1 || username.length<1){
            return false;
        }else{
            return true;
        }

    };

    const handleRegister=()=>{
        const userDetails={
            username,
            password,
            mail,
        };

        register(userDetails, navigate);
    };

    return (
        <AuthBox>
            <RegisterPageHeader/>
            <RegisterPageInputs
                mail={mail}
                setMail={setMail}
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
            />
            <RegisterPageFooter
                handleRegister={handleRegister}
                isFormValid={isFormValid}
                tooltipMsg={errorMsg}
            />
        </AuthBox>
    );
};

const mapActionsToProps=(dispatch)=>{
    return{
        ...getActions(dispatch),
    };
};

export default connect(null,mapActionsToProps)(RegisterPage);