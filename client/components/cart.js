import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeItemQuantityThunk, removeItemThunk } from '../store';
import Checkout from './stripeCheckout';
import Price from './price';

// const Cart = props => {
//   const promoCode = 'SLEEPY XIFENG';
//   return (
//     <section id="cart" className="cart">
//       <h1 className="cart__header">
//         Your cart {!props.cart.lineItems.length ? 'is empty.' : null}
//       </h1>
//       {props.cart.lineItems.length &&
//         props.cart.lineItems.map(lineItem => (
//           <div key={lineItem.id} className="cart__item">
//             <h2 className="cart__item___name">{lineItem.product.name}</h2>
//             <img className="cart__item___img" src={lineItem.product.image} />
//             <Price className="cart__item___price" product={lineItem.product} />
//             <label className="cart__item___quantity">
//               Quantity:{' '}
//               <input
//                 type="number"
//                 value={lineItem.qty}
//                 min="1"
//                 onChange={evt =>
//                   props.changeQty(props.cart.id, lineItem.id, evt.target.value)
//                 }
//               />
//             </label>
//             <button
//               className="cart__button"
//               type="button"
//               onClick={() => props.removeItem(props.cart.id, lineItem.id)}
//             >
//               Remove
//             </button>
//           </div>
//         ))}
//       <label htmlFor="promo-code">Insert Promo Code: </label>
//       <input id="promo-code" type="text" />
//       <p className="cart__total">Total: ${props.subtotal / 100}</p>
//       <Checkout subtotal={props.subtotal} />
//     </section>
//   );
// };
const promoCode = 'SLEEPY XIFENG'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      promoInput: '',
    };
    this.changeHandler = this.changeHandler.bind(this)
  }

  changeHandler(evt) {
    this.setState({promoInput: evt.target.value})
    console.log(this.state.promoInput)
  }

  render() {
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
                onClick={() => this.props.removeItem(this.props.cart.id, lineItem.id)}
              >
                Remove
              </button>
            </div>
          ))}
        <form>
        <label htmlFor="promo-code">Insert Promo Code: </label>
        <input id="promo-code" type="text" value={this.state.promoInput} onChange={this.changeHandler} />
        <button type="submit" >Submit</button>
        </form>
        <p className="cart__total">Total: ${this.props.subtotal / 100}</p>
        <Checkout subtotal={this.props.subtotal} />
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
