import React, { Component } from 'react';
import { connect } from 'react-redux';

const AllProducts = props => {

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
      },
      {
        id: 4,
        name: 'Pistachios',
        description: 'These are pistachios.',
        price: 22.5,
        inventory: 25
      }
    ];
    const products = dummyProducts;

    return (
      <div id="products">
        <h1 id="products-header">Products: </h1>
        {products.map(product => {
          return (
            <div key={product.id} className="individual-product" >
              <h3>{product.name}</h3>
              <h4>{product.description}</h4>
              <p>${product.price}</p>
              {product.inventory < 10 && <p>ONLY {product.inventory} LEFT</p>}
            </div>
          );
        })}
      </div>
    );

}

export default AllProducts
