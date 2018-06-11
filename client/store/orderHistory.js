import axios from 'axios';

//ACTION
const GET_MY_ORDERS = 'GET_MY_ORDERS';
const REMOVE_ORDER_HISTORY = 'REMOVE_ORDER_HISTORY';

//ACTION CREATORS

const getMyOrders = orderHistory => ({ type: GET_MY_ORDERS, orderHistory });
export const removeOrderHistory = () => ({ type: REMOVE_ORDER_HISTORY });

//THUNKS

export const fetchMyOrders = () => dispatch => {
  axios
    .get('/api/myOrders')
    .then(res => res.data)
    .then(foundOrders => dispatch(getMyOrders(foundOrders)))
    .catch(console.error);
};

// REDUCER

export default function(state = [], action) {
  switch (action.type) {
    case GET_MY_ORDERS:
      return action.orderHistory || [];
    case REMOVE_ORDER_HISTORY:
      return [];
    default:
      return state;
  }
}
