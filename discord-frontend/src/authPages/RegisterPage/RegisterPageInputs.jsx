import React from 'react';
import InputWithLabel from '../../shared/components/InputWithLabel';
import { styled } from '@mui/system';
import email_icon from "../../assets/sobre.png";
import password_icon from "../../assets/cerrar1.png";
import user_icon from "../../assets/usuario.png";

const Wrapper=styled('div')({
    marginTop: '55px',
    display: 'flex',
    flexDirection: 'column',
    gap: '25px',
});

const RegisterPageInputs = (props) => {
    const {mail,setMail,username,setUsername, password,setPassword}=props;

    return (
        <Wrapper>
            <InputWithLabel
                value={mail}
                setValue={setMail}
                label={email_icon}
                type="text"
                placeholder="Ingrese su correo electrónico"
            />
            <InputWithLabel
                value={username}
                setValue={setUsername}
                label={user_icon}
                type="text"
                placeholder="Ingrese un nombre de usuario"
            />
            <InputWithLabel
                value={password}
                setValue={setPassword}
                label={password_icon}
                type="password"
                placeholder="Ingrese una contraseña"
            />
        </Wrapper>
    );
};

export default RegisterPageInputs;