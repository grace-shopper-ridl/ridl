import React from 'react';
import { connect } from 'react-redux';
import { changeItemQuantityThunk, removeItemThunk } from '../store';
import Checkout from './stripeCheckout';
import Price from './price';

const Cart = props => {
  return (
    <section id="cart" className="cart">
			<h1 className="cart__header">Your cart {!props.cart.lineItems.length ? 'is empty.' : null}</h1>
      {props.cart.lineItems.length &&
        props.cart.lineItems.map(lineItem => (
          <div key={lineItem.id} className="cart__item">
            <h2 className="cart__item___name">{lineItem.product.name}</h2>
            <img className="cart__item___img" src={lineItem.product.image} />
            <Price className="cart__item___price" product={lineItem.product} />
            <label className="cart__item___quantity">
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
							className="cart__button"
              type="button"
              onClick={() => props.removeItem(props.cart.id, lineItem.id)}
            >
              Remove
            </button>
          </div>
        ))}
      <p className="cart__total">Total: ${props.subtotal / 100}</p>
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
