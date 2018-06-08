import React, { Component } from 'react';
import { connect } from 'react-redux';
import Ratings from './rating';
import {
  fetchCurrentProduct,
  addItemThunk,
  changeItemQuantityThunk
} from '../store';

const dummyReviews = [
  {
    id: 1,
    title: 'JUST THE WORST',
    rating: 1,
    description: 'IF I COULD RATE THIS A ZERO I WOULD!!!'
  },
  {
    id: 2,
    title: 'The best thing ever',
    rating: 5,
    description:
      'I have no idea why the above reviewer feels the way they do, it is great.'
  },
  {
    id: 3,
    title: 'Super Cool',
    rating: 4,
    description: 'Cold as ice.'
  },
  {
    id: 4,
    title: 'Blah',
    rating: 3,
    description: "It's like your opinion man."
  },
  {
    id: 5,
    title: 'iT aLrIGHt',
    rating: 2,
    description: 'Probably'
  }
];

class SingleProduct extends Component {
  componentDidMount() {
    this.props.setCurrentProduct(this.props.match.params.productId);
  }

  render() {
    const singleProduct = this.props.currentProduct;
    const cart = this.props.cart;
    const reviews = dummyReviews;
    return (
      <div id="single-product">
        <h2>{singleProduct.name}</h2>
        <p>${singleProduct.price}</p>
        <img src={singleProduct.image} />
        <h4>{singleProduct.description}</h4>
        {this.props.isLoggedIn && (
          <button
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
        )}
        <h3>REVIEWS:</h3>
        <section id="reviews">
          {reviews.map(review => (
            <div key={review.id} className="review">
              <h4>{review.title}</h4>
              <p>{review.description}</p>
              <p>Rating:</p>
              <Ratings rating={review.rating} />
            </div>
          ))}
        </section>
      </div>
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
    console.log(
      'THIS IS OUR ALREADY EXISTING ITEM>>>',
      alreadyExistingLineItem
    );
    if (!alreadyExistingLineItem) {dispatch(addItemThunk(orderId, productId, price, qty));}
    else {dispatch(
        changeItemQuantityThunk(
          orderId,
          alreadyExistingLineItem.id,
          alreadyExistingLineItem.qty + 1
        )
      );}
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
