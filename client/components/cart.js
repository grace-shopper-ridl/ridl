import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeItemQuantityThunk } from '../store';

const Cart = props => {
  return (
      <section id="cart">
        {props.cart.lineItems.map(lineItem => (
            <div key={lineItem.id} className="lineItem" >
                <h3>{lineItem.product.name}</h3>
                <img src={lineItem.product.image} />
                <p>${lineItem.price}</p>
                <p>Quantity: {lineItem.qty}</p>
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

export default ConnectedCart
