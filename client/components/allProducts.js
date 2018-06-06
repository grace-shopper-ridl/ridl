import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const AllProducts = props => {
  const products = props.products;

  return (
    <section id="products">
      <h1 id="products-header">Products: </h1>
      {products.map(product => {
        return (
          <div key={product.id} className="individual-product">
            <Link to={`/products/${product.id}`}>
              <h3>{product.name}</h3>
            </Link>
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

const mapStateToProps = state => {
  return {
    products: state.products
  };
};

export default connect(mapStateToProps)(AllProducts);
