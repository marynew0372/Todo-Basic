import styled from "styled-components";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export const StackStyled = styled(Stack)`
    align-items: center;
    margin: 20px 0;
    
    
    & .MuiPagination-ul {
        flex-wrap: nowrap;
    }
    
    & .MuiFormControl-root {
        margin: 0;
    }
`

export const PaginationStyled = styled(Pagination)`
    button {
        color: ${({ theme }) => theme.text};
    }
`