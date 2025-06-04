import * as React from 'react';
import { useState } from 'react';
import TextField from './TextField';
import TaskAddButton from './Button';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import styled from 'styled-components';

const AlertWrapper = styled.div`
    margin-bottom: 10px;
`

interface AddTodoProps {
    onAddTask: (task: string) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({onAddTask}) => {
    const [task, setTask] = useState('');
    const [emptyFieldError, setEmptyFieldError] = useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTask(event.target.value);
        setEmptyFieldError(false);
    }

    const handleAddTaskButton = () => {
        if (task.trim()) {
            onAddTask(task);
            setTask('')
        } else {
            setEmptyFieldError(true);
        }
    }

    const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
    ) => {
    if (reason === 'clickaway') {
      return;
    };
    setEmptyFieldError(false);
    };

    return (
        <>
            <AlertWrapper>
                {emptyFieldError && 
                    <Snackbar open={emptyFieldError} autoHideDuration={2000} onClose={handleClose}>
                        <Alert
                        onClose={handleClose}
                        severity="error"
                        variant="filled"
                        sx={{ width: '100%' }}
                        >
                        Не заполнено имя задачи
                        </Alert>
                    </Snackbar>
                }
            </AlertWrapper>
            <div className='add-todo'>
                <TextField value={task} onChange={handleInputChange}></TextField>
                <TaskAddButton onClick={handleAddTaskButton}></TaskAddButton>
            </div>
        </>
    )
}

export default AddTodo;