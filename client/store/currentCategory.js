import axios from 'axios';

// ACTION
const GET_CURRENT_CATEGORY = 'GET_CURRENT_CATEGORY';

// ACTION CREATOR
const getCurrentCategory = currentCategory => ({
  type: GET_CURRENT_CATEGORY,
  currentCategory
});

// THUNK!
export const fetchCurrentCategory = categoryId => dispatch => {
  axios
    .get(`/api/categories/${categoryId}`)
    .then(res => res.data)
    .then(foundCategory => dispatch(getCurrentCategory(foundCategory)))
    .catch(err => console.log(err));
};

// REDUCER
export default function(state = {}, action) {
  switch (action.type) {
    case GET_CURRENT_CATEGORY:
      return action.currentCategory;
    default:
      return state;
  }
}
