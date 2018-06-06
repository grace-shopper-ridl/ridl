import axios from 'axios';

const GET_CURRENT_PRODUCT = 'GET_CURRENT_PRODUCT';

const getCurrentProduct = currentProduct => ({
  type: GET_CURRENT_PRODUCT,
  currentProduct
});

// THUNK!
export const fetchCurrentProduct = productId => dispatch => {
  axios
    .get(`/api/products/${productId}`)
    .then(res => res.data)
    .then(foundProduct => dispatch(getCurrentProduct(foundProduct)))
    .catch(err => console.log(err));
};

export default function(state = {}, action) {
  switch (action.type) {
    case GET_CURRENT_PRODUCT:
      return action.currentProduct;
    default:
      return state;
  }
}
