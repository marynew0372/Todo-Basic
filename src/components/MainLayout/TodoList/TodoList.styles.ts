import styled from 'styled-components';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SwapVertIcon from '@mui/icons-material/SwapVert';

export const ButtonSort = styled.div`
    margin: 5px 0;
`

export const ListContainer = styled.div`
    -webkit-box-shadow: 0px 0px 10px -3px rgba(0, 0, 0, 1);
    -moz-box-shadow: 0px 0px 10px -3px rgba(0, 0, 0, 1);
    box-shadow: 0px 0px 10px -3px rgba(0, 0, 0, 1);
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 114px;
    min-width: 450px;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.background};

    span {
        font-weight: bolder;
    }

    .msgNoTask {
        margin: 0;
    }

    p {
        color: ${({ theme }) => theme.text};
    }

    ul {
        max-width: 420px;
        min-width: 420px;
        color: black;
        background-color: unset;
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 25px 0 25px 0;
        margin: 0 auto;

        li {
        color: ${({ theme }) => theme.text};
        width: 350px;
        margin: 0 auto;

            .MuiListItemText-root {
            display: inline-block;
            overflow: hidden;
            }
        }
    }
`

export const EditIconCustom = styled(EditIcon)`
    color: ${({ theme }) => theme.text};
`

export const DeleteIconCustom = styled(DeleteIcon)`
    color: ${({ theme }) => theme.text};
`
export const SwapVertIconCustom = styled(SwapVertIcon)`
    color: ${({ theme }) => theme.text};
`