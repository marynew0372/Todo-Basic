import { useState } from 'react';
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { EditTodoCustom } from './EditTodo.styles';

interface EditTodoProps {
    open: boolean;
    task: string;
    onClose: () => void;
    onSave: (newTask: string) => void;
}

const EditTodo: React.FC<EditTodoProps> = ({open, task, onClose, onSave}) => {
    const [editedTask, setEditedTask] = useState(task)

    const handleSave = () => {
        onSave(editedTask);
        onClose();
    }   

    return (
        <EditTodoCustom open={open} onClose={onClose}>
            <DialogTitle>Редактировать задачу</DialogTitle>
            <DialogContent>
                <TextField
                label='Название задачи'
                variant='standard'
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEditedTask(event.target.value)}
                />
                <DialogActions>
                    <Button variant="contained" color="success" onClick={handleSave}>Сохранить</Button>
                    <Button variant="outlined" color="error" onClick={onClose}>Отмена</Button>
                </DialogActions>
            </DialogContent>
        </EditTodoCustom>
    )
}

export default EditTodo;