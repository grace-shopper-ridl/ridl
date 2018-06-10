import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Price from './price';

class AllProducts extends Component {
  constructor(props) {
    super(props);
    this.state = { query: '' };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ query: event.target.value });
  }

  render() {
    const products = this.props.products;
    let { query } = this.state;
    query = query.toLowerCase();

    return (
      <section id="products">
        <input
          className="search"
          name="query"
          type="text"
          placeholder="Search Wines by Name"
          value={this.state.query}
          onChange={this.handleChange}
        />
      <h1 id="products-header">Wines:</h1>
        {products
          .filter(product => product.name.toLowerCase().includes(query))
          .map(product => {
            return (
              <div key={product.id} className="individual-product">
                <Link to={`/products/${product.id}`}>
                  <h2 className="individual-product__name">{product.name}</h2>
                </Link>
                <Price product={product} className="individual-product__price" />
                {product.inventory < 10 && <p className="inventory-warning">ONLY {product.inventory} LEFT</p>}
                <img className="individual-product__img" src={product.image} />
              </div>
            );
          })}
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  };
};

export default connect(mapStateToProps)(AllProducts);
