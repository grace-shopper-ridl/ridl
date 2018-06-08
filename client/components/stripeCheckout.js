import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

export default class Checkout extends React.Component {
  onToken = token => {
    console.log(token);
    axios.post('/stripe-token', token);
  };

  render() {
    return (
      <StripeCheckout
        //this.props.cart.subTotal
        amount={1000000} // cents
        currency="USD"
        token={this.onToken}
        stripeKey="pk_test_LA1a5gfY8ZPlFKY14Sgo6mj3"
      />
    );
  }
}
