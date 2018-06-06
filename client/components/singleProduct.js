import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurrentProduct } from '../store';

class SingleProduct extends Component {
  componentDidMount() {
    this.props.setCurrentProduct(this.props.match.params.productId);
  }

  render() {
    const singleProduct = this.props.currentProduct;
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

const mapStateToProps = state => ({
  currentProduct: state.currentProduct
});

const mapDispatchToProps = dispatch => ({
  setCurrentProduct: productId => {
    dispatch(fetchCurrentProduct(productId));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleProduct);
