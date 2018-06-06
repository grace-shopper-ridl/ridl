import React, { Component } from 'react';
import { connect } from 'react-redux';

import { dummyProducts } from './allProducts';

export default class SingleProduct extends Component {
  render() {
    const productId = this.props.match.params.productId;
    const singleProduct = dummyProducts[+productId - 1];
    return (
      <div id="single-product">
        <h2>{singleProduct.name}</h2>
        <p>${singleProduct.price}</p>
        <img src={singleProduct.image} />
        <h4>{singleProduct.description}</h4>
      </div>
    );
  }
}
