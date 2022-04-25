import axios from "axios";
const _API = 'https://fakestoreapi.com/products';

// FETCH ALL CATEGORIES
export const fetchByCategory = (category) => (dispatch) => {
  dispatch(productsFetching());
  axios.get(_API + `${category === 'all' ? '' : '/category/' + category}`)
    .then((res) => {
      const newRes = res.data.map((item) => {
        item.favorite = false;
        item.count = 1;
        item.total_price = item.price;
        return item;
      })
      dispatch(productsFetched(newRes))
    })
    .catch(() => {
      dispatch(productsFetchingError())
    });
}

// FETCH ALL CATEGORIES
export const fetchAllCategories = () => (dispatch) => {
  // dispatch(productsFetching());
  axios.get(_API + `/categories`)
    .then((res) => {
      console.log(res.data);
      dispatch(getAllCategories(res.data))
    })
    .catch(() => {
      // dispatch(productsFetchingError())
    });
}

const getAllCategories = (products) => {
  return {
    type: 'GET_ALL_CATEGORIES',
    payload: products
  }
}

// FETCH BY SORT
export const fetchBySort = (sort) => (dispatch) => {
  dispatch(productsFetching());
  axios.get(_API + `?sort=${sort}`)
    .then((res) => {
      console.log(res);
      const newRes = res.data.map((item) => {
        item.favorite = false;
        item.count = 1;
        item.total_price = item.price;
        return item;
      })
      dispatch(productsFetched(newRes))
    })
    .catch(() => dispatch(productsFetchingError()));
}

// FETCH ALL PRODUCTS
export const fetchAllProducts = () => (dispatch) => {
  dispatch(productsFetching());
  axios.get(_API)
    .then((res) => {
      console.log(res);
      const newRes = res.data.map((item) => {
        item.favorite = false;
        item.count = 1;
        item.total_price = item.price;
        return item;
      })
      dispatch(productsFetched(newRes));
    })
    .catch(() => dispatch(productsFetchingError()))
}

const productsFetching = () => {
  return {
      type: 'PRODUCTS_FETCHING'
  }
}

const productsFetched = (products) => {
  return {
      type: 'PRODUCTS_FETCHED',
      payload: products
  }
}

const productsFetchingError = () => {
  return {
      type: 'PRODUCTS_FETCHING_ERROR'
  }
}

// ADD TO BASKET
export const addToBasket = (product) => (dispatch) => {
  dispatch({
    type: 'ADD_TO_BASKET',
    payload: product,
  })
}
// REMOVE FROM BASKET
export const removeFromBasket = (id) => (dispatch) => {
  dispatch({
    type: 'REMOVE_FROM_BASKET',
    payload: id,
  })
}

//ADD QUANTITY
export const addQuantity = (product) => (dispatch) => {
  dispatch({
    type: 'ADD_QUANTITY',
    payload: product,
  })
}
// REMOVE QUANTITY
export const removeQuantity = (product) => (dispatch) => {
  dispatch({
    type: 'REMOVE_QUANTITY',
    payload: product,
  })
}

// SET FAVORITES
export const setFavorites = (product) => (dispatch) => {
  dispatch({
    type: 'SET_FAVORITES',
    payload: product,
  })
}
// REMOVE FROM BASKET
export const removeFromFavorites = (id) => (dispatch) => {
  dispatch({
    type: 'REMOVE_FROM_FAVORITES',
    payload: id,
  })
}