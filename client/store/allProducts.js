import axios from 'axios';

// ACTION TYPES
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';

// ACTION CREATOR
const getAllProducts = products => ({ type: GET_ALL_PRODUCTS, products });

// THUNK
export const fetchProducts = () => dispatch => {
  axios
    .get('/api/products')
    .then(res => res.data)
    .then(foundProducts => dispatch(getAllProducts(foundProducts)))
    .catch(err => console.log(err));
};

// REDUCER
export default function(state = [], action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.products;
    default:
      return state;
  }
}
