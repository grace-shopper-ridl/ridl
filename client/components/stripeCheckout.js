import React from 'react';
import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

class Checkout extends React.Component {
  onToken = token => {
    axios.post(`/api/orders/${this.props.cart.id}/checkout`, token);
    // change the current order(cart) in our database from cart to created
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

const mapStateToProps = state => ({
  cart: state.cart
})

export default connect(mapStateToProps)(Checkout);
