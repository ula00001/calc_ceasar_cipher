import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
}

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    todoCreated: (state, action) => {
      state.todos.push(action.payload);
    },
    todoDeleted: (state, action) => {
      state.todos = state.todos.filter((item, index) => item.id !== action.payload);
    },
    todoIsDone: (state, action) => {
      console.log(action);
      const id = action.payload;
      const index = state.todos.findIndex(item => item.id === id);
      state.todos[index].isDone = !state.todos[index].isDone;
    }
  },
})

const { actions, reducer } = todosSlice;

export default reducer;
export const {
  todoCreated,
  todoDeleted,
  todoIsDone,
} = actions;

