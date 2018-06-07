import axios from 'axios';

// ACTION TYPES
const GET_CART = 'GET_CART'
const ADD_ITEM = 'ADD_ITEM'
const REMOVE_ITEM = 'REMOVE_ITEM'
const CHANGE_ITEM_QUANTITY = 'CHANGE_ITEM_QUANTITY'

// ACTION CREATOR
const getCart = cart => ({ type: GET_CART, cart });
const addItem = item => ({ type: ADD_ITEM, item });
const removeItem = allItemsMinusDeleted => ({ type: REMOVE_ITEM, allItemsMinusDeleted });
const changeItemQuantity = allItemsUpdated => ({ type: CHANGE_ITEM_QUANTITY, allItemsUpdated })

// THUNK

export const getCartThunk = userId => dispatch => {
	axios
		.get(`/api/users/${userId}/cart/`) // PLACEHOLDER This route will depend on backend implementation
		.then(res => res.data)
		.then(cart => dispatch(getCart(cart)))
		.catch(err => console.log(err));
}

export const addItemThunk = (orderId, productId) => dispatch => {
	axios
		.post(`/api/orders/${orderId}/lineItems`, { productId }) // PLACEHOLDER This route will depend on backend implementation
		.then(res => res.data)
		.then(newLineItem => dispatch(addItem(newLineItem)))
		.catch(err => console.log(err));
}

export const removeItemThunk = (orderId, lineItemId) => dispatch => {
  axios
    .delete(`/api/orders/${orderId}/lineItems/${lineItemId}`) // PLACEHOLDER This route will depend on backend implementation
    .then(res => res.data)
    .then(allItemsMinusDeleted => dispatch(removeItem(allItemsMinusDeleted)))
    .catch(err => console.log(err));
};

export const changeItemQuantityThunk = (orderId, lineItemId, quantity) => dispatch => {
  axios
    .put(`/api/orders/${orderId}/lineItems/${lineItemId}`, { quantity }) // PLACEHOLDER This route will depend on backend implementation
    .then(res => res.data)
    .then(allItemsUpdated => dispatch(changeItemQuantity(allItemsUpdated)))
    .catch(err => console.log(err));
};

// REDUCER

const initialState = {
	orderId: 0,
	lineItems: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return { orderId: state.cart.id, lineItems: state.cart.lineItems };
		case ADD_ITEM:
      return { ...state, lineItems: [...state.lineItems, action.item] };
		case REMOVE_ITEM:
			return { ...state, lineItems: action.allItemsMinusDeleted };
		case CHANGE_ITEM_QUANTITY:
			return { ...state, lineItems: action.allItemsUpdated}
    default:
      return state;
  }
}
