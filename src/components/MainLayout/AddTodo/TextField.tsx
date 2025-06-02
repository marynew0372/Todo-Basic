import React from 'react';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';

const ThemedInput = styled(TextField)`
    :not(MuiFormLabel-root) {
        color: ${({ theme }) => theme.text};
    }

    .MuiInputBase-input {
        color: ${({ theme }) => theme.text};
    }

    .MuiOutlinedInput-root {
        &:hover:not(.Mui-focused) .MuiOutlinedInput-notchedOutline {
            border-color: ${({ theme }) => theme.text};
        }
    
        fieldset {
            border-color: ${({ theme }) => theme.borderInput};
        }          
    }
`

interface InputFieldProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({value, onChange}) => {
    return (
        <ThemedInput 
        label={'Введите задачу'}
        variant='outlined'
        value={value}
        onChange={onChange}
        fullWidth
        />
    )
}

export default InputField;