import React from 'react';
import { connect } from 'react-redux';
import { changeItemQuantityThunk, removeItemThunk } from '../store';
import Checkout from './stripeCheckout';

const Cart = props => {
  return (
    <section id="cart">
      {props.cart.lineItems.length &&
        props.cart.lineItems.map(lineItem => (
          <div key={lineItem.id} className="lineItem">
            <h3>{lineItem.product.name}</h3>
            <img src={lineItem.product.image} />
            <p>${lineItem.price}</p>
            <label>
              Quantity:{' '}
              <input
                type="number"
                value={lineItem.qty}
                onChange={evt =>
                  props.changeQty(props.cart.id, lineItem.id, evt.target.value)
                }
              />
            </label>
            <button type="button" onClick={() => props.removeItem(props.cart.id, lineItem.id)} >Remove Item</button>
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
  },
  removeItem: (orderId, lineItemId) => {
    dispatch(removeItemThunk(orderId, lineItemId))
  }
});

const ConnectedCart = connect(mapStateToProps, mapDispatchToProps)(Cart);

export default ConnectedCart;
