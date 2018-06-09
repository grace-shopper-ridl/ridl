import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeItemQuantityThunk } from '../store';

const Cart = props => {
  const cartId = props.cart.id;
  const changeQty = props.changeQty;
  return (
    <section id="cart">
      {props.cart.lineItems.length &&
        props.cart.lineItems.map(lineItem => (
          <div key={lineItem.id} className="lineItem">
            <h3>{lineItem.product.name}</h3>
            <img src={lineItem.product.image} />
            <p>${lineItem.price}</p>
            <label>
              Quantity: <input type="number" value={lineItem.qty} />
            </label>
          </div>
        ))}
      <button type="submit">Checkout</button>
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
