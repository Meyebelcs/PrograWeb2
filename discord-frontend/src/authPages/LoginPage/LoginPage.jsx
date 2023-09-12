import React, {useState, useEffect} from 'react';
import AuthBox from '../../shared/components/AuthBox';
import LoginPageHeader from './LoginPageHeader';
import LoginPageInputs from './LoginPageInputs';
import LoginPageFooter from './LoginPageFooter';
import { connect } from 'react-redux';
import { getActions } from '../../store/actions/authActions';
import { useNavigate } from "react-router-dom";

const LoginPage = ({login}) => {
    
    const navigate= useNavigate();

    const [mail,setMail]=useState("");
    const [password, setPassword]=useState("");
    const [isFormValid, setIsFormValid]=useState(false);

    useEffect(()=>{
        setIsFormValid(validateLoginForm({mail,password}));
    });

    const validateLoginForm=({mail,password})=>{
        if(mail.length<1 || password.length<1){
            return false;
        }else{
            return true;
        }

    };
 
    const handleLogin=()=>{
        const userDetails={
            mail,
            password,
        };

        login(userDetails,navigate);
    };

    return (
        <AuthBox>
            <LoginPageHeader/>
            <LoginPageInputs
                mail={mail}
                setMail={setMail}
                password={password}
                setPassword={setPassword}
            />
            <LoginPageFooter isFormValid={isFormValid} handleLogin={handleLogin}/>
        </AuthBox>
    );
};

const mapActionsToProps=(dispatch)=>{
    return{
        ...getActions(dispatch),
    };
};

export default connect(null,mapActionsToProps)(LoginPage);