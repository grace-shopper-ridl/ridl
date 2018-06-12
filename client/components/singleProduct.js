import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import Ratings from './rating';
import Price from './price';
import NotFound from './notFound';
import AddReview from './addReview';
import {
  fetchCurrentProduct,
  addItemThunk,
  changeItemQuantityThunk,
  getCartThunk,
  removeCurrentProduct
} from '../store';

class SingleProduct extends Component {
  componentDidMount() {
    this.props.setCurrentProduct(this.props.match.params.productId);
    this.props.createUnauthCart();
  }
  componentWillUnmount() {
    this.props.removeCurrentProduct();
  }
  render() {
    const singleProduct = this.props.currentProduct;
    const cart = this.props.cart;
    const reviews = singleProduct ? singleProduct.reviews : [];
    return singleProduct ? (
      <section id="single-product" className="product-detail">
        <h1 className="product-detail__name">{singleProduct.name}</h1>
        <Price product={singleProduct} className="product-detail__price" />
        <img className="product-detail__img" src={singleProduct.image} />
        <p className="product-detail__descr">{singleProduct.description}</p>
        {
          <button
            className="addToCart"
            type="button"
            onClick={() => {
              this.props.addItemToCart(
                cart.lineItems,
                cart.id,
                singleProduct.id,
                singleProduct.price,
                1
              );
              toastr.success('Added to cart', singleProduct.name);
            }}
          >
            Add to Cart
          </button>
        }
        <section id="reviews">
          <h2 className="review__heading">Reviews of {singleProduct.name}:</h2>
          {this.props.isLoggedIn && <AddReview />}
          {reviews &&
            reviews.map(review => (
              <div key={review.id} className="review">
                <h3 className="review__title">{review.title}</h3>
                <p className="review__descr">{review.description}</p>
                <p>Rating:</p>
                <Ratings rating={review.rating} />
              </div>
            ))}
        </section>
      </section>
    ) : (
      <NotFound />
    );
  }
}

const mapStateToProps = state => ({
  currentProduct: state.currentProduct,
  cart: state.cart,
  isLoggedIn: !!state.user.id
});

const mapDispatchToProps = dispatch => ({
  setCurrentProduct: productId => {
    dispatch(fetchCurrentProduct(productId));
  },
  addItemToCart: (lineItems, orderId, productId, price, qty) => {
    let alreadyExistingLineItem = lineItems.find(
      element => element.productId === productId // checks to see if lineItem is already in cart
    );
    if (!alreadyExistingLineItem) {
      // if not, add it to cart
      dispatch(addItemThunk(orderId, productId, price, qty));
    } else {
      //if so, change quantity of item in cart
      dispatch(
        changeItemQuantityThunk(
          orderId,
          alreadyExistingLineItem.id,
          alreadyExistingLineItem.qty + 1
        )
      );
    }
  },
  createUnauthCart: () => {
    let cart = JSON.parse(localStorage.getItem('redux')).cart.id;
    if (!cart) dispatch(getCartThunk(null, {}));
  },
  removeCurrentProduct: () => {
    dispatch(removeCurrentProduct())
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
