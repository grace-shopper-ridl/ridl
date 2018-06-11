import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './user';
import products from './allProducts';
import currentProduct from './currentProduct';
import cart from './cart';
import categories from './categories';
import currentCategory from './currentCategory';
import orders from './orders';
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
  orders,
  currentOrder
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
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
export * from './orders';
export * from './currentOrder';
