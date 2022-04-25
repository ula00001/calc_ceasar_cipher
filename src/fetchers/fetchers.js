import axios from "axios"
const _api = 'https://fakestoreapi.com/products';

export const fetchProducts= () => {
  return axios.get(_api).then(res => res.data)
}