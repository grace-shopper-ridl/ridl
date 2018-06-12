import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import persistState from 'redux-localstorage';
import { reducer as toastr } from 'react-redux-toastr';
import user from './user';
import products from './allProducts';
import currentProduct from './currentProduct';
import cart from './cart';
import categories from './categories';
import currentCategory from './currentCategory';
import orderHistory from './orderHistory';
import currentOrder from './currentOrder';

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
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true })),
  persistState('cart')
);
const store = createStore(reducer, middleware);

export default store;
export * from './user';
export * from './allProducts';
export * from './currentProduct';
export * from './cart';
export * from './categories';
export * from './currentCategory';
export * from './orderHistory';
export * from './currentOrder';
