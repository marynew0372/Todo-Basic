import { createTodo, deleteTodo, fetchTodos, toggleTask, updateTodo } from '../../src/api/todos';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Task, DataPayload } from './tasksSlice';

export const fetchTaskThunk = createAsyncThunk<
    DataPayload,
    { page: number, limit: number },
    { rejectValue: string }
>(
    'tasks/fetchTasks',
    async ({page = 1, limit = 10}, thunkAPI) => {
        try {
            const response = await fetchTodos(page, limit);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue('Не удалось загрузить задачи');
        }
    }
)

export const addTaskThunk = createAsyncThunk<
    Task,
    { taskText: string },
    { rejectValue: string }
>(
    'tasks/addTask',
    async ({taskText}, thunkAPI) => {
        try {
            const newTask = await createTodo(taskText);
            return newTask;
        } catch (error) {
            return thunkAPI.rejectWithValue('ошибка');
        }
    }
)

export const deleteTaskThunk = createAsyncThunk<
    number,
    { id: number },
    { rejectValue: boolean }
>(
    'tasks/deleteTask',
    async ({id}, thunkAPI) => {
        try {
            await deleteTodo(id);
            return id;
        } catch (error) {
            return thunkAPI.rejectWithValue(true);
        }
    }
)

export const editTaskThunk = createAsyncThunk(
    'tasks/editTask',
    async ({id, newText}: {id: number, newText: string}) => {
        const updatedTask = await updateTodo(id, {text: newText});
        return updatedTask;
    }
)

export const ToggleCompletedThunk = createAsyncThunk(
    'tasks/toggleCompleted',
    async ({id}: {id: number}, thunkAPI) => {
        try {
            const updatedTask = await toggleTask(id);
            return updatedTask
        } catch (error) {
            return thunkAPI.rejectWithValue('Ошибка при изменении статуса задачи');
        }
    }
)