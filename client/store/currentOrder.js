import axios from 'axios';

// ACTION TYPES
const SET_CURRENT_ORDER = 'SET_CURRENT_ORDER';

// ACTION CREATOR
const setCurrentOrder = currentOrder => ({ type: SET_CURRENT_ORDER, currentOrder });

// THUNK
export const fetchCurrentOrder = orderId => dispatch => {
  axios
    .get(`/api/orders/${orderId}`)
    .then(res => res.data)
    .then(foundOrder => dispatch(setCurrentOrder(foundOrder)))
    .catch(err => console.log(err));
};

// REDUCER
export default function(state = {}, action) {
  switch (action.type) {
    case SET_CURRENT_ORDER:
      return action.currentOrder;
    default:
      return state;
  }
}
