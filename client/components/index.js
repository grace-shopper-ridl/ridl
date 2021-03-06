export { default as AllProducts } from './allProducts';
export { default as SingleProduct } from './singleProduct';

/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export { default as Navbar } from './navbar';
export { default as UserHome } from './user-home';
export { default as Cart } from './cart';
export { default as OrderHistory } from './OrderHistory';
export { Login, Signup } from './auth-form';
export { default as HomePage } from './homePage';
export {default as CurrentOrder} from './currentOrder'
