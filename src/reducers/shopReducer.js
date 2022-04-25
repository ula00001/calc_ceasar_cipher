import { loadFavoritesFromLocal } from "../localStorage/favoritesLocalStorage";
import { loadFromLocalStorage } from "../localStorage/productsLocalStorage";

 const initialState = {
  products: [],
  basket: loadFromLocalStorage(),
  favorites: loadFavoritesFromLocal(),
  all_categories: [],
  productsLoadingStatus: 'idle',
}

const shop = (state = initialState, action) => {
  const newState = {
    ...state,
    productsLoadingStatus: 'idle'
  };

  switch (action.type) {
    case 'PRODUCTS_FETCHING':
      return {
        ...state,
        productsLoadingStatus: 'loading',
      }

    case 'PRODUCTS_FETCHED':
      newState.products = action.payload;
      newState.favorites.map((favorite) => {
        newState.products.map((product) => {
          if (favorite.id === product.id) {
            product.favorite = true;
          }
        })
      })
      newState.productsLoadingStatus = 'idle';
      break;

    case 'PRODUCTS_FETCHING_ERROR':
      return {
        ...state,
        products: action.payload,
        productsLoadingStatus: 'error'
      }

    // CATEGORIES
    case 'GET_ALL_CATEGORIES':
      newState.all_categories = action.payload;
    break;

    // FAVORITES
    case 'SET_FAVORITES':
      newState.favorites = [...newState.favorites, action.payload];
      newState.favorites.filter((item) => item.id !== action.payload.id);
      newState.products.map((item) => {
        if (item.id === action.payload.id) {
          item.favorite = !item.favorite;
          if (!item.favorite) {
            newState.favorites = newState.favorites.filter((item) => item.id !== action.payload.id);
          }
        }
      })
      newState.products = [...newState.products];
    break;

    case 'REMOVE_FROM_FAVORITES':
      newState.favorites = newState.favorites.filter((item) => item.id !== action.payload.id);
      newState.products.map((item) => {
        if (item.id === action.payload.id) {
          item.favorite = false;
        }
      })
      newState.products = [...newState.products]
    break;

    // QUANTITY
    case 'ADD_QUANTITY':
      newState.basket.map((item) => {
        if (item.id === action.payload.id) {
          item.count += 1;
          item.total_price = parseFloat((item.price * item.count).toFixed(2));
        }
      })
      newState.basket = [...newState.basket];
    break;

    case 'REMOVE_QUANTITY':
      newState.basket.map((item) => {
        if (item.id === action.payload.id) {
          if (item.count === 1) return;
          item.count -= 1;
          item.total_price = parseFloat((item.total_price - item.price).toFixed(2)) ;
        }
      })
      newState.basket = [...newState.basket];
    break;

    // BASKET
    case 'REMOVE_FROM_BASKET':
      newState.basket = newState.basket.filter((item) => item.id !== action.payload.id);
    break;

    case 'ADD_TO_BASKET':
      let flag = false;

      const checkToId = (arr) => {
        arr.map((item) => {
          if (item.id === action.payload.id) {
            item.count += 1;
            item.total_price = parseFloat((item.price * item.count).toFixed(2));
            flag = true;
          }
        })
        newState.basket = [...newState.basket];
      }

      if (newState.basket.length !== 0) {
        checkToId(newState.basket);
        if (!flag) {
          newState.basket = [...newState.basket, action.payload];
        }
      } else {
        newState.basket = [...newState.basket, action.payload];
      }

      newState.productsLoadingStatus = 'idle';
      break;

    default: return state;
  }
  return newState;
}

export default shop;