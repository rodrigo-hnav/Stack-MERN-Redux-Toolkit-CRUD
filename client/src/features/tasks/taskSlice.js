import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {POSTS_URL} from '../../config.js'


console.log('POSTS_URL', POSTS_URL)
const initialState = {
    tasks: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    doneTasks: false,
}


export const fetchTasks = createAsyncThunk(
    'tasks/fetchTasks',
    async () => {
        const response = await axios.get(POSTS_URL,{
            headers: {
              'content-type': 'application/json'
            }
          })
        return response.data
    }
)

export const updateTask = createAsyncThunk('tasks/updateTask', async (initialTask) => {
    const { _id } = initialTask;
    try {
        const response = await axios.put(`${POSTS_URL}/${_id}`, initialTask)
        return response.data
    } catch (err) {
        return initialTask; 
    }
})

export const deleteTaskA = createAsyncThunk('tasks/deleteTaskA', async (initialPost) => {
    const { _id } = initialPost;
    try {
        const response = await axios.delete(`${POSTS_URL}/${_id}`)
        if (response?.status === 200) return initialPost;
        return `${response?.status}: ${response?.statusText}`;
    } catch (err) {
        return err.message;
    }
})

export const addNewTask = createAsyncThunk('tasks/addNewTask', async (task) =>{
    try {
        const response = await axios.post(POSTS_URL, task)
        if(response?.status === 200) return response.data
        return `${response?.status}: ${response?.statusText}`
    } catch (err) {
        return err.message
    }
})


export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        doneTasksSet: (state, action) => {
            state.doneTasks = action.payload
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
        .addCase(fetchTasks.fulfilled, (state, action) => {
            state.status = 'succeeded'
            // Add user to the state array
            state.tasks = state.tasks.concat(action.payload)
        })
        .addCase(fetchTasks.pending, (state,action) =>{
            state.status = 'loading'
        })
        .addCase(fetchTasks.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
        .addCase(updateTask.fulfilled, (state, action) => {
            if (!action.payload?.id) {
                console.log('Update could not complete')
                console.log(action.payload)
                return;
            }
            const { id } = action.payload;
            const tasks = state.tasks.filter(task => task.id !== id);
            state.tasks = [...tasks, action.payload];
        })
        .addCase(deleteTaskA.fulfilled, (state, action) => {
            if (!action.payload?.id) {
                console.log('Delete could not complete ')
                console.log(action.payload)
                return;
            }
            const { id } = action.payload;
            const tasks = state.tasks.filter(task => task.id !== id);
            state.tasks = tasks;
        })
        .addCase(addNewTask.fulfilled, (state, action)=>{
            state.tasks.push(action.payload)
        })
    },
})
export const selectAllTasks = (state) => state.tasks.tasks;
export const getTasksStatus = (state) => state.tasks.status;
export const getTasksError = (state) => state.tasks.error;
export const { doneTasksSet } = taskSlice.actions

export default taskSlice.reducer