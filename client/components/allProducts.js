import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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
          name="query"
          type="text"
          placeholder="Search Product by Name"
          value={this.state.query}
          onChange={this.handleChange}
        />
        <h1 id="products-header">Products: </h1>
        {products
          .filter(product => product.name.toLowerCase().includes(query))
          .map(product => {
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
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  };
};

export default connect(mapStateToProps)(AllProducts);
