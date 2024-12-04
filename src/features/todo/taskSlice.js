import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    tasks: [],
    loading: false,
    error: null,
    status: "All", 
};


export const fetchTodo = createAsyncThunk('tasks/fetchTodo', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=12');
    const data = await response.json();
    return data.map(task => ({
        id: task.id,
        title: task.title,
        description: '', 
        status: task.completed ? "Completed" : "Todo",
        dueDate: '', 
    }));
});

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        // Adding a new task
        addTask: (state, action) => {
            state.tasks.push(action.payload); 
        },

        // Editing an existing task
        editTask: (state, action) => {
            state.tasks = state.tasks.map(task => (
                task.id === action.payload.id ? action.payload : task
            ));
        },

        // Deleting a task by its id
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload); 
        },
        updateTaskStatus(state, action) {
            const { id, status } = action.payload;
            const task = state.tasks.find((task) => task.id === id);
            if (task) {
              task.status = status;
             
            }
          },
          markExpiredTasks: (state) => {
            const currentDate = new Date();
            state.tasks.forEach((task) => {
                if (task.dueDate && new Date(task.dueDate) < currentDate && task.status !== "Expired") {
                    task.status = "Expired";
                }
            });
        },
        setSearchQuery: (state, action) => { 
            state.searchQuery = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTodo.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload;
            })
            .addCase(fetchTodo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; 
            });
    }
});

export default taskSlice.reducer;

export const { addTask, editTask, deleteTask, updateTaskStatus,markExpiredTasks,setSearchQuery } = taskSlice.actions;
