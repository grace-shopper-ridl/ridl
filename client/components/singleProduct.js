import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurrentProduct } from '../store';
import Ratings from './rating'

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
    const reviews = dummyReviews;
    return (
      <div id="single-product">
        <h2>{singleProduct.name}</h2>
        <p>${singleProduct.price}</p>
        <img src={singleProduct.image} />
        <h4>{singleProduct.description}</h4>
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
  currentProduct: state.currentProduct
});

const mapDispatchToProps = dispatch => ({
  setCurrentProduct: productId => {
    dispatch(fetchCurrentProduct(productId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
