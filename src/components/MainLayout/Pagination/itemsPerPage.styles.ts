import styled from 'styled-components';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export const FormControlStyled = styled(FormControl)`
    margin: 20px 0 !important;

    .MuiFormLabel-root {
        color: ${({ theme }) => theme.text};
    }

    // .MuiInputBase-root {
    //     color: ${({ theme }) => theme.text};
    // }

    .MuiSelect-icon {
        color: ${({ theme }) => theme.text};
    }
`



export const OutlinedInputStyled = styled(OutlinedInput)`
    &:hover:not(.Mui-focused) .MuiOutlinedInput-notchedOutline {
        border-color: ${({ theme }) => theme.text};
    }
    .MuiOutlinedInput-root {
    }   
    fieldset {
        border-color: ${({ theme }) => theme.borderInput};
    }
`

export const SelectStyled = styled(Select<string>)`
    .MuiSelect-outlined {
        color: ${({ theme }) => theme.text};
    }
`