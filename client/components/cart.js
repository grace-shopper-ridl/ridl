import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeItemQuantityThunk } from '../store';

const Cart = props => {
  return (
      <section id="cart">
        {props.cart.lineItems.map(lineItem => (
            <div key={lineItem.id} className="lineItem" >
                <h2>{lineItem.product.name}</h2>
            </div>
    ))}
      </section>
    )
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

export default Cart
