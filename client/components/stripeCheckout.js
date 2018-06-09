import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

export default class Checkout extends React.Component {
  onToken = token => {
    axios.put('/stripe-token', token);
    // change the current order(cart) in our database from cart to created
  };

  render() {
    return (
      <StripeCheckout
        //this.props.cart.subTotal
        amount={this.props.subtotal} // cents
        currency="USD"
        token={this.onToken}
        stripeKey="pk_test_LA1a5gfY8ZPlFKY14Sgo6mj3"
      />
    );
  }
}
