import React from 'react';
import InputWithIcon from '../../shared/components/InputWithLabel';
import { styled } from '@mui/system';
import email_icon from "../../assets/sobre.png";
import password_icon from "../../assets/cerrar1.png";

const Wrapper=styled('div')({
    marginTop: '55px',
    display: 'flex',
    flexDirection: 'column',
    gap: '25px',
});

const LoginPageInputs = ({mail, setMail, password, setPassword}) => {
    return (
    <Wrapper>
        <InputWithIcon
        value={mail}
        setValue={setMail}
        label={email_icon}
        type="text"
        placeholder="Correo electrónico"
        />
        <InputWithIcon
        value={password}
        setValue={setPassword}
        label={password_icon}
        type="password"
        placeholder="Contraseña"
        />
    </Wrapper>
    );
};

export default LoginPageInputs;