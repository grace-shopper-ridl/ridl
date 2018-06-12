import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer as toastr } from 'react-redux-toastr';
import user from './user';
import products from './allProducts';
import currentProduct from './currentProduct';
import cart from './cart';
import categories from './categories';
import currentCategory from './currentCategory';
import orderHistory from './orderHistory';
import currentOrder from './currentOrder';

let initState = {};
const persistedState = localStorage.getItem('reduxState');

if (persistedState) {
  initState = JSON.parse(persistedState);
}

const reducer = combineReducers({
  user,
  products,
  currentProduct,
  cart,
  categories,
  currentCategory,
  toastr,
  orderHistory,
  currentOrder
});

const middleware = process.env.NODE_ENV === 'development' ? composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
) : composeWithDevTools(applyMiddleware(thunkMiddleware));

const store = createStore(reducer, initState, middleware);

store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

export default store;
export * from './user';
export * from './allProducts';
export * from './currentProduct';
export * from './cart';
export * from './categories';
export * from './currentCategory';
export * from './orderHistory';
export * from './currentOrder';
