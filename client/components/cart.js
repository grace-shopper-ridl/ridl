import React from 'react';
import { connect } from 'react-redux';
import { changeItemQuantityThunk, removeItemThunk } from '../store';
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
              Quantity:{' '}
              <input
                type="number"
                value={lineItem.qty}
                min="1"
                onChange={evt =>
                  props.changeQty(props.cart.id, lineItem.id, evt.target.value)
                }
              />
            </label>
            <button
              type="button"
              onClick={() => props.removeItem(props.cart.id, lineItem.id)}
            >
              Remove Item
            </button>
          </div>
        ))}
      <p>TOTAL: ${props.subtotal / 100}</p>
      <Checkout subtotal={props.subtotal} />
    </section>
  );
};

const mapStateToProps = state => ({
  cart: state.cart,
  subtotal: state.cart.lineItems.reduce(
    (currTotal, lineItem) => currTotal + lineItem.price * lineItem.qty,
    0
  )
});

const mapDispatchToProps = dispatch => ({
  changeQty: (orderId, lineItemId, qty) => {
    dispatch(changeItemQuantityThunk(orderId, lineItemId, qty));
  },
  removeItem: (orderId, lineItemId) => {
    dispatch(removeItemThunk(orderId, lineItemId));
  }
});

const ConnectedCart = connect(mapStateToProps, mapDispatchToProps)(Cart);

export default ConnectedCart;
