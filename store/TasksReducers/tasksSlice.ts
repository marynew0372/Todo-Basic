import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addTaskThunk, deleteTaskThunk, editTaskThunk, fetchTaskThunk, ToggleCompletedThunk } from './tasksThunks';


export interface Task {
    id: number;
    text: string;
    createdAt: Date;
    completed: boolean;
};

export interface DataPayload {
    data: Task[],
    limit: number,
    page: number,
    total: number,
    totalPages: number,
    // isSorted: boolean,
}

interface TaskState {
    tasks: DataPayload;
    isSorted: boolean,
    errorLoadTasks: string | undefined;
    errorCreateTask: string | undefined;
    errorDeleteTask: boolean | undefined,
    successDeleteTask: boolean | undefined,
    sucessEditTask: boolean | undefined;
    successToggleCompletedTask: boolean | undefined;
};

const initialState: TaskState = {
    tasks: {
        data: [],
        limit: 10,
        page: 1,
        total: 10,
        totalPages: 1,
    },
    isSorted: false,
    errorLoadTasks: undefined,
    errorCreateTask: undefined,
    errorDeleteTask: false,
    successDeleteTask: false,
    sucessEditTask: false,
    successToggleCompletedTask: false,
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setTasks(state, action: PayloadAction<Task[]>) {
            state.tasks.data = action.payload;
        },
        addTask(state, action: PayloadAction<Task>) {
            state.tasks.data.unshift(action.payload);
        },
        deleteTask(state, action: PayloadAction<number>) {
            state.tasks.data = state.tasks.data.filter((task) => task.id !== action.payload);
        },
        clearDeleteErrorAlert(state) {
            state.errorDeleteTask = false;
            state.successDeleteTask = false;
        },
        clearEditAlert(state) {
            state.sucessEditTask = false;
        },
        clearToggleCompletedTaskAlert(state) {
            state.successToggleCompletedTask = false;
        },
        savePage(state, action: PayloadAction<number>) {
            state.tasks.page = action.payload;
        },
        saveLimit(state, action: PayloadAction<number>) {
            state.tasks.limit = action.payload;
        },
        toggleSorted(state) {
            state.isSorted = state.isSorted ? false : true;
        }
    },
    extraReducers: (builder) => {
        builder
        //FETCH TASKS
        .addCase(fetchTaskThunk.fulfilled, (state, action: PayloadAction<DataPayload>) => {
            action.payload.data.sort((a, b) => {
                const dateA = new Date(a.createdAt).getTime();
                const dateB = new Date(b.createdAt).getTime();
                return !state.isSorted ? dateB - dateA : dateA - dateB;
            });
            state.tasks = action.payload;
            console.log(state.tasks);
            state.errorLoadTasks = undefined;
        })
        .addCase(fetchTaskThunk.rejected, (state, action) => {
            state.errorLoadTasks = action.payload;
        })
        //CREATE TASK
        .addCase(addTaskThunk.fulfilled, (state, action: PayloadAction<Task>) => {
            state.tasks.data.unshift(action.payload);
            state.errorCreateTask = undefined;
        })
        .addCase(addTaskThunk.rejected, (state, action) => {
            state.errorCreateTask = action.payload;
        })
        //DELETE TASK
        .addCase(deleteTaskThunk.fulfilled, (state, action) => {
            state.tasks.data = state.tasks.data.filter((task) => task.id !== action.payload);
            state.errorDeleteTask = false;
            state.successDeleteTask = true;
        })
        .addCase(deleteTaskThunk.rejected, (state, action) => {
            state.errorDeleteTask = action.payload;
            state.successDeleteTask = false;
        })
        //EDIT TASK
        .addCase(editTaskThunk.fulfilled, (state, action) => {
            state.sucessEditTask = true;
            const index = state.tasks.data.findIndex((task) => task.id === action.payload.id);
            if (index !== -1) {
                state.tasks.data[index] = action.payload;
            }
        })
        //TOGGLE TASK
        .addCase(ToggleCompletedThunk.fulfilled, (state, action) => { 
            const task = state.tasks.data.find(t => t.id === action.payload.id);
            if (task && task.completed === false) {
                state.successToggleCompletedTask = true;
            }
            const index = state.tasks.data.findIndex((task) => task.id === action.payload.id);
            if (index !== -1) {
                state.tasks.data[index] = action.payload;
            }
        })
    }
});

export const { setTasks, addTask, deleteTask, clearDeleteErrorAlert, clearEditAlert, clearToggleCompletedTaskAlert, savePage, saveLimit, toggleSorted} = tasksSlice.actions;
export default tasksSlice.reducer;
