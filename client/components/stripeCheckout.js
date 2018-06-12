import React from 'react';
import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { getCartThunk, fetchMyOrders } from '../store';
import history from '../history';

class Checkout extends React.Component {
  onToken = token => {
    axios
      .post(`/api/orders/${this.props.cart.id}/checkout`, {
        token,
        amount: this.props.subtotal
      })
      .then(() => {
        this.props.getNewCart(this.props.user.id); // gets new cart after changing status to created
      })
      .then(() => {
        if (this.props.user.id) this.props.getMyOrders();
      })
      .then(() => {
        history.push('/home');
      })
      .catch(console.error);
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

const mapStateToProps = state => ({
  cart: state.cart,
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  getNewCart: userId => {
    dispatch(getCartThunk(userId, {}));
  },
  getMyOrders: () => {
    dispatch(fetchMyOrders());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
