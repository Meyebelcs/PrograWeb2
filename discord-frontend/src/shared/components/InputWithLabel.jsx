import React from 'react';
import {styled} from "@mui/system";

const Wrapper=styled('div')({
    display: 'flex',
    alignItems: 'center',
    margin: 'auto',
    width: '480px',
    height: '80px',
    background: '#eaeaea',
    borderRadius: '6px',
});

const Label = styled("p")({
    color:"#b9bbbe",
    textTransform:"uppercase",
    fontWeight:"600",
    fontSize:"16px",
});

const Input=styled('input')({
    height: '50px',
    width: '400px',
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color: '#797979',
    fontSize: '19px',

});

const Icon=styled('img')({
    margin: '0px 30px',
})

const InputWithLabel = (props) => {

    const {value,setValue, label, type, placeholder}=props;

    const handleValueChange=(event)=>{
        setValue(event.target.value);
    }

    return <Wrapper>
        <Icon src={label} alt=''/>
        <Input
        value={value}
        onChange={handleValueChange}
        type={type}
        placeholder={placeholder}
        />
    </Wrapper>;
};

export default InputWithLabel;