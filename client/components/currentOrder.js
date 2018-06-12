import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurrentOrder } from '../store';
import { Link } from 'react-router-dom';
import Price from './price';

class CurrentOrder extends Component {
  componentDidMount() {
    this.props.setOrder(this.props.match.params.orderId);
  }
  render() {
    const { currentOrder } = this.props;
    return (
      <section>
        <h2>Order Number #{currentOrder.id}</h2>
        <h3>Status: {currentOrder.status}</h3>
        <h3>Date Created: {new Date(currentOrder.createdAt).toDateString()}</h3>
        {currentOrder.lineItems &&
          currentOrder.lineItems.map(lineItem => (
            <div key={lineItem.id} className="individual-product">
              <Link to={`/products/${lineItem.product.id}`}>
                <h2 className="individual-product__name">
                  {lineItem.product.name}
                </h2>
              </Link>
              <p>Subtotal: ${lineItem.qty * lineItem.price / 100}</p>
              <p>Quantity: {lineItem.qty}</p>
              {lineItem.product.inventory < 10 && (
                <p className="inventory-warning">
                  ONLY {lineItem.product.inventory} LEFT
                </p>
              )}
              <img
                className="individual-product__img"
                src={lineItem.product.image}
              />
            </div>
          ))}
          <h2>Total: ${currentOrder.subTotal / 100}</h2>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  currentOrder: state.currentOrder
});

const mapDispatchToProps = dispatch => ({
  setOrder: orderId => {
    dispatch(fetchCurrentOrder(orderId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrentOrder);
