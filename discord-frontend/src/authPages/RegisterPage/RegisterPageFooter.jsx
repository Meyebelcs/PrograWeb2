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

const RegisterPageFooter = ({handleRegister, isFormValid, tooltipMsg}) => {
    const navigate= useNavigate();

    const handlePushToLoginPage=()=>{ //Nos redirige a la página de registro
        navigate("/login");
    };

    return (
        <Wrapper>
        <Tooltip
        title={!isFormValid?tooltipMsg:'Presione para registrarse'}>
        <div>
            <CustomPrimaryButton
              label='Registrate' 
              additionalStyles={{marginTop:'30px'}}
              disabled={!isFormValid}
              onClick={handleRegister} 
            />
        </div>
        </Tooltip>
        <RedirectInfo
            text='¿Ya tienes una cuenta? '
            redirectText='Inicia sesión'
            additionalStyles={{marginTop:'5px'}}
            redirectHandler={handlePushToLoginPage}
        />
        </Wrapper>
    );
};

export default RegisterPageFooter;