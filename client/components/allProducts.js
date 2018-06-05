import React, { Component } from 'react';
import { connect } from 'react-redux';

export default class AllProducts extends Component {
  render() {
    const dummyProducts = [
      {
        id: 1,
        name: 'Peanuts',
        description: 'These are peanuts.',
        price: 34.5,
        inventory: 10
      },
      {
        id: 2,
        name: 'Cashews',
        description: 'These are cashews.',
        price: 32.5,
        inventory: 1
      },
      {
        id: 3,
        name: 'Pecans',
        description: 'These are pecans.',
        price: 27.5,
        inventory: 20
      }
    ];
    const products = dummyProducts;

    return (
      <div>
        <h1>This is our Products: </h1>
        {products.map(product => {
          return (
            <div key={product.id}>
              <h3>{product.name}</h3>
              <h4>{product.description}</h4>
              <p>{product.price}</p>
              {product.inventory < 10 && <p>ONLY {product.inventory} LEFT</p>}
            </div>
          );
        })}
      </div>
    );
  }
}
