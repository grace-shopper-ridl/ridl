import React, { Component } from 'react';
import { connect } from 'react-redux';

class SingleProduct extends Compenent {
  render() {
    const singleProduct = {
      id: 1,
      name: 'Peanuts',
      description: 'These are peanuts.',
      price: 34.5,
      inventory: 10,
      image: 'https://nuts.com/images/auto/801x534/assets/1a8f816738ffc617.jpg',
      categories: [],
      reviews: []
    };
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
