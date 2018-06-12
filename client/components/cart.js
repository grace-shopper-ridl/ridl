import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeItemQuantityThunk, removeItemThunk } from '../store';
import Checkout from './stripeCheckout';
import Price from './price';
import { toastr } from 'react-redux-toastr';

const promoCode = 'SLEEPY DAN';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      promoInput: '',
      matches: false
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  changeHandler(evt) {
    this.setState({ promoInput: evt.target.value });
  }

  submitHandler(evt) {
    evt.preventDefault();
    if (this.state.promoInput === promoCode) {
      this.setState(() => {
        toastr.success('YOU DID IT!', `${promoCode} COUPON APPLIED`);
        return { matches: true, promoInput: '' };
      });
    } else {
      toastr.error('WRONG CODE', 'THE PROMO CODE YOU SUBMITTED IS INVALID');
      this.setState({promoInput: ''})
    }
  }

  render() {
    let subTotal = this.state.matches
      ? this.props.subtotal * 0.85
      : this.props.subtotal;
    return (
      <section id="cart" className="cart">
        <h1 className="cart__header">
          Your cart {!this.props.cart.lineItems.length ? 'is empty.' : null}
        </h1>
        {this.props.cart.lineItems.length &&
          this.props.cart.lineItems.map(lineItem => (
            <div key={lineItem.id} className="cart__item">
              <h2 className="cart__item___name">{lineItem.product.name}</h2>
              <img className="cart__item___img" src={lineItem.product.image} />
              <Price
                className="cart__item___price"
                product={lineItem.product}
              />
              <label className="cart__item___quantity">
                Quantity:{' '}
                <input
                  type="number"
                  value={lineItem.qty}
                  min="1"
                  onChange={evt =>
                    this.props.changeQty(
                      this.props.cart.id,
                      lineItem.id,
                      evt.target.value
                    )
                  }
                />
              </label>
              <button
                className="cart__button"
                type="button"
                onClick={() =>
                  this.props.removeItem(this.props.cart.id, lineItem.id)
                }
              >
                Remove
              </button>
            </div>
          ))}
        <form onSubmit={this.submitHandler}>
          <label htmlFor="promo-code">Insert Promo Code: </label>
          <input
            id="promo-code"
            type="text"
            value={this.state.promoInput}
            onChange={this.changeHandler}
          />
          <button type="submit">Submit</button>
        </form>
        <p className="cart__total">Total: ${(subTotal / 100).toFixed(2)}</p>
        <Checkout subtotal={subTotal} />
      </section>
    );
  }
}

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
