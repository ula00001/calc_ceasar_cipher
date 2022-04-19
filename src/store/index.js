import todos from '../pages/todo/TodoListSlice'
import counter from '../reducers/reducer'
import { configureStore } from '@reduxjs/toolkit'

const stringMiddleware = (store) => (next) => (action) => {
  if (typeof action === 'string') {
    return next({
      type: action,
    })
  }

  return next(action);
}

const store = configureStore({
  reducer: { todos: todos, counter: counter},
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
  devTools: process.env.NOVE_ENV !== 'production',

})

export default store;

