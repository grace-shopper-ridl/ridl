import React, { Component } from 'react';
import { connect } from 'react-redux';

const AllProducts = props => {
  const dummyProducts = [
    {
      id: 1,
      name: 'Peanuts',
      description: 'These are peanuts.',
      price: 34.5,
      inventory: 10,
      image: 'https://nuts.com/images/auto/801x534/assets/1a8f816738ffc617.jpg'
    },
    {
      id: 2,
      name: 'Cashews',
      description: 'These are cashews.',
      price: 32.5,
      inventory: 1,
      image: 'https://nuts.com/images/auto/801x534/assets/1a8f816738ffc617.jpg'
    },
    {
      id: 3,
      name: 'Pecans',
      description: 'These are pecans.',
      price: 27.5,
      inventory: 20,
      image: 'https://nuts.com/images/auto/801x534/assets/1a8f816738ffc617.jpg'
    },
    {
      id: 4,
      name: 'Pistachios',
      description: 'These are pistachios.',
      price: 22.5,
      inventory: 25,
      image: 'https://nuts.com/images/auto/801x534/assets/1a8f816738ffc617.jpg'
    }
  ];
  const products = dummyProducts;

  return (
    <section id="products">
      <h1 id="products-header">Products: </h1>
      {products.map(product => {
        return (
          <div key={product.id} className="individual-product">
            <h3>{product.name}</h3>
            <h4>{product.description}</h4>
            <img src={product.image} />
            <p>${product.price}</p>
            {product.inventory < 10 && <p>ONLY {product.inventory} LEFT</p>}
          </div>
        );
      })}
    </section>
  );
};

export default AllProducts;
