import axios from 'axios';

const GET_CURRENT_PRODUCT = 'GET_CURRENT_PRODUCT';
const ADD_REVIEW = 'ADD_REVIEW';
const REMOVE_CURRENT_PRODUCT = 'REMOVE_CURRENT_PRODUCT';

const getCurrentProduct = currentProduct => ({
  type: GET_CURRENT_PRODUCT,
  currentProduct
});

const addReview = review => ({ type: ADD_REVIEW, review });

export const removeCurrentProduct = () => ({ type: REMOVE_CURRENT_PRODUCT });

// THUNK!
export const fetchCurrentProduct = productId => dispatch => {
  axios
    .get(`/api/products/${productId}`)
    .then(res => res.data)
    .then(foundProduct => dispatch(getCurrentProduct(foundProduct)))
    .catch(err => console.log(err));
};

export const postNewReview = (productId, review) => dispatch => {
  // review is an object with props: {title, description, userId, rating}
  axios
    .post(`/api/products/${productId}/reviews`, review)
    .then(res => res.data)
    .then(newReview => dispatch(addReview(newReview)))
    .catch(console.error);
};

export default function(state = {}, action) {
  switch (action.type) {
    case GET_CURRENT_PRODUCT:
      return action.currentProduct;
    case ADD_REVIEW:
      return { ...state, reviews: [...state.reviews, action.review] };
    case REMOVE_CURRENT_PRODUCT:
      return {};
    default:
      return state;
  }
}
