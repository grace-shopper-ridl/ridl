import React, { Component } from 'react';
import { connect } from 'react-redux';
import Ratings from './rating';
import Price from './price';
import NotFound from './notFound';
import {
  fetchCurrentProduct,
  addItemThunk,
  changeItemQuantityThunk,
  getCartThunk
} from '../store';

class SingleProduct extends Component {
  componentDidMount() {
    this.props.setCurrentProduct(this.props.match.params.productId);
    this.props.createUnauthCart();
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
            }}
          >
            Add to Cart
          </button>
        }
        <section id="reviews">
          <h2 className="review__heading">Reviews of {singleProduct.name}:</h2>
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
      element => element.productId === productId
    );
    if (!alreadyExistingLineItem) {
      dispatch(addItemThunk(orderId, productId, price, qty));
    } else {
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
    let cart = JSON.parse(localStorage.getItem('reduxState')).cart.id;
    if (!cart) dispatch(getCartThunk());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
