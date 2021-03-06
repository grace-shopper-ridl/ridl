import axios from 'axios';
import { toastr } from 'react-redux-toastr'
import history from '../history';
import { getCartThunk, removeCart } from './cart';
import { fetchMyOrders, removeOrderHistory } from './orderHistory';
/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';

/**
 * INITIAL STATE
 */
const defaultUser = {};

/**
 * ACTION CREATORS
 */
const getUser = user => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });

/**
 * THUNK CREATORS
 */
export const me = () => dispatch =>
  axios
    .get('/auth/me')
    .then(res => {
      dispatch(getUser(res.data || defaultUser));
      if (res.data.id) {
        dispatch(getCartThunk(res.data.id, {}));
        dispatch(fetchMyOrders());
      }
    })
    .catch(err => console.log(err));

export const auth = (email, password, method) => dispatch =>
  axios
    .post(`/auth/${method}`, { email, password })
    .then(
      res => {
        let storageCart = JSON.parse(localStorage.getItem('redux')).cart;
        dispatch(getUser(res.data));
        dispatch(getCartThunk(res.data.id, storageCart));
        dispatch(fetchMyOrders());
        history.push('/');
        toastr.success(`Welcome ${res.data.email}`, 'Start wine-ing!')
      },
      authError => {
        // rare example: a good use case for parallel (non-catch) error handler
        dispatch(getUser({ error: authError }));
      }
    )
    .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr));

export const logout = () => dispatch =>
  axios
    .post('/auth/logout')
    .then(_ => {
      dispatch(removeUser());
      dispatch(removeCart());
      dispatch(removeOrderHistory());
      history.push('/login');
    })
    .catch(err => console.log(err));

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    default:
      return state;
  }
}
