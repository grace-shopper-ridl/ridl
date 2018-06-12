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
      <section className="cart">
        <h2 className="cart__header" >Order Number #{currentOrder.id}</h2>
        <h3 className="cart__header">Status: {currentOrder.status}</h3>
        <h3 className="cart__header">Date Created: {new Date(currentOrder.createdAt).toDateString()}</h3>
        {currentOrder.lineItems &&
          currentOrder.lineItems.map(lineItem => (
            <div key={lineItem.id} className="cart__item">
            <img
              className="cart__item___img"
              src={lineItem.product.image}
            />
              <Link to={`/products/${lineItem.product.id}`}>
                <h2 className="cart__item___name">
                  {lineItem.product.name}
                </h2>
              </Link>
              <p className="cart__item___price">Price: ${lineItem.price / 100}</p>
              <p className="cart__item___price">Quantity: {lineItem.qty}</p>
              <p className="cart__item___price">Subtotal: ${lineItem.qty * lineItem.price / 100}</p>
            </div>
          ))}
          <p className="cart__total">Total: ${(currentOrder.subTotal / 100).toFixed(2)}</p>
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
