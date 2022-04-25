import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import todos from '../pages/todo/TodoListSlice'
import counter from '../reducers/reducer'
import shop from '../reducers/shopReducer';
// import { configureStore } from '@reduxjs/toolkit'
import { saveToLocalStorage, loadFromLocalStorage } from "../localStorage/productsLocalStorage";
import { saveFavoritesToLocal, loadFavoritesFromLocal } from "../localStorage/favoritesLocalStorage";

const stringMiddleware = (store) => (next) => (action) => {
  if (typeof action === 'string') {
    return next({
      type: action,
    })
  }
  return next(action);
}

const store = createStore(
  combineReducers({ todos: todos, counter: counter, shop: shop }),
  compose(applyMiddleware(ReduxThunk, stringMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
)
store.subscribe(() => saveToLocalStorage(store.getState().shop.basket));

store.subscribe(() => saveFavoritesToLocal(store.getState().shop.favorites));

export default store;

