import React from 'react';
import CustomPrimaryButton from '../../shared/components/CustomPrimaryButton';
import RedirectInfo from '../../shared/components/RedirectInfo';
import {useNavigate} from "react-router-dom";
import { Tooltip } from '@mui/material';
import {styled} from "@mui/system";

const Wrapper=styled('div')({
    alignItems: 'center',
    margin: 'auto',
    width: '480px',
});
const LoginPageFooter = ({handleLogin, isFormValid}) => {

    const navigate= useNavigate();

    const handlePushToRegisterPage=()=>{ //Nos redirige a la página de registro
        navigate("/register");
    };

    return (
        <Wrapper>
        <Tooltip
        title={!isFormValid?'Ingrese sus credenciales':'Presione para iniciar sesión'}>
        <div>
            <CustomPrimaryButton
              label='Inicia Sesión' 
              additionalStyles={{marginTop:'30px'}}
              disabled={!isFormValid}
              onClick={handleLogin} 
            />
        </div>
        </Tooltip>
        <RedirectInfo
            text='¿No tienes una cuenta? '
            redirectText='Crea una cuenta'
            additionalStyles={{marginTop:'5px'}}
            redirectHandler={handlePushToRegisterPage}
        />
        </Wrapper>
    );
};

export default LoginPageFooter;