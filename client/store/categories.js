import axios from 'axios';

// ACTION TYPES
const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES';

// ACTION CREATOR
const getAllCategories = categories => ({ type: GET_ALL_CATEGORIES, categories });

// THUNK
export const fetchCategories = () => dispatch => {
  axios
    .get('/api/categories')
    .then(res => res.data)
    .then(foundCategories => dispatch(getAllCategories(foundCategories)))
    .catch(err => console.log(err));
};

// REDUCER
export default function(state = [], action) {
  switch (action.type) {
    case GET_ALL_CATEGORIES:
      return action.categories;
    default:
      return state;
  }
}
