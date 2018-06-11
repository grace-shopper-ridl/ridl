import axios from 'axios';
import history from '../history';

// ACTION TYPES
const GET_CART = 'GET_CART';
const ADD_ITEM = 'ADD_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';
const CHANGE_ITEM_QUANTITY = 'CHANGE_ITEM_QUANTITY';
const REMOVE_CART = 'REMOVE_CART';

// ACTION CREATOR
const getCart = cart => ({ type: GET_CART, cart });
const addItem = item => ({ type: ADD_ITEM, item });
const removeItem = allItemsMinusDeleted => ({
  type: REMOVE_ITEM,
  allItemsMinusDeleted
});
const changeItemQuantity = allItemsUpdated => ({
  type: CHANGE_ITEM_QUANTITY,
  allItemsUpdated
});
export const removeCart = () => ({ type: REMOVE_CART });

// THUNK

export const getCartThunk = (userId, storageCart) => dispatch => {
  // if userId is undefined, create a new cart without a userid
  let orderPromise;
  if (userId && storageCart.id) {
    orderPromise = axios.put(`/api/orders/${storageCart.id}/syncCart`, {
      id: userId
    });
  } else if (userId) {
    orderPromise = axios.get(`/api/users/${userId}/cart`);
  } else {
    orderPromise = axios.post(`/api/orders`);
  }
  // let orderPromise = !userId
  //   ? axios.post(`/api/orders`)
  //   : axios.get(`/api/users/${userId}/cart`);

  orderPromise
    .then(res => res.data)
    .then(cart => {
      dispatch(getCart(cart));
    })
    .catch(err => console.log(err));
};

export const addItemThunk = (orderId, productId, price, qty) => dispatch => {
  axios
    .post(`/api/orders/${orderId}/lineItems`, { productId, price, qty })
    .then(res => res.data)
    .then(newLineItem => dispatch(addItem(newLineItem)))
    .catch(err => console.log(err));
};

export const removeItemThunk = (orderId, lineItemId) => dispatch => {
  axios
    .delete(`/api/orders/${orderId}/lineItems/${lineItemId}`)
    .then(res => res.data)
    .then(allItemsMinusDeleted => dispatch(removeItem(allItemsMinusDeleted)))
    .catch(err => console.log(err));
};

export const changeItemQuantityThunk = (
  orderId,
  lineItemId,
  qty
) => dispatch => {
  if (qty) {
    axios
      .put(`/api/orders/${orderId}/lineItems/${lineItemId}`, { qty })
      .then(res => res.data)
      .then(allItemsUpdated => dispatch(changeItemQuantity(allItemsUpdated)))
      .catch(err => console.log(err));
  }
};

// REDUCER

const initialState = {
  orderId: 0,
  lineItems: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return { id: action.cart.id, lineItems: action.cart.lineItems || [] };
    case ADD_ITEM:
      return { ...state, lineItems: [...state.lineItems, action.item] };
    case REMOVE_ITEM:
      return { ...state, lineItems: action.allItemsMinusDeleted };
    case CHANGE_ITEM_QUANTITY:
      return { ...state, lineItems: action.allItemsUpdated };
    case REMOVE_CART:
      return initialState;
    default:
      return state;
  }
}
