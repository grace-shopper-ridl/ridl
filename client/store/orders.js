import axios from 'axios';

//ACTION
const GET_ORDERS = 'GET_ORDERS';

//ACTION CREATORS

const getOrders = orders => ({ type: GET_ORDERS, orders });

//THUNKS

export const fetchOrders = () => dispatch => {
  axios
    .get('/api/myOrders')
    .then(res => res.data)
    .then(foundOrders => dispatch(getOrders(foundOrders)))
    .catch(console.error);
};

// REDUCER

export default function(state = [], action) {
    switch (action.type) {
        case GET_ORDERS:
            return action.orders;
        default:
            return state;
    }
}
