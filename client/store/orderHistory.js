import axios from 'axios';

//ACTION
const GET_MY_ORDERS = 'GET_MY_ORDERS';

//ACTION CREATORS

const getMyOrders = orderHistory => ({ type: GET_MY_ORDERS, orderHistory });

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
            return action.orderHistory;
        default:
            return state;
    }
}
