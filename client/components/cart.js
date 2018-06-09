import React from 'react';
import { connect } from 'react-redux';
import { changeItemQuantityThunk } from '../store';
import Checkout from './stripeCheckout';
import Price from './price';

const Cart = props => {
  return (
    <section id="cart">
      {props.cart.lineItems.length &&
        props.cart.lineItems.map(lineItem => (
          <div key={lineItem.id} className="lineItem">
            <h3>{lineItem.product.name}</h3>
            <img src={lineItem.product.image} />
            <Price product={lineItem.product} />
            <label>
              Quantity: <input type="number" placeholder={lineItem.qty} />
            </label>
          </div>
        ))}
      <Checkout />
    </section>
  );
};

const mapStateToProps = state => ({
  cart: state.cart
});

const mapDispatchToProps = dispatch => ({
  changeQty: (orderId, lineItemId, qty) => {
    dispatch(changeItemQuantityThunk(orderId, lineItemId, qty));
  }
});

const ConnectedCart = connect(mapStateToProps, mapDispatchToProps)(Cart);

export default ConnectedCart;
