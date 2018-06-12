import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const OrderHistory = props => {
  return (
    <section id="orders" className="order">
      <h1 id="orders-header" className="order__header">Order History: </h1>
      {props.orderHistory &&
        props.orderHistory.map(order => {
          return (
            <div key={order.id} className="order__item">
              <h2 className="order__item___name">
                <Link to={`/orders/${order.id}`} className="purple">
                  Order Number #{order.id}
                </Link>
              </h2>
              <h3 className="order__item___name">Status: {order.status}</h3>
              <p className="order__item___name">${(order.subTotal / 100).toFixed(2)}</p>
            </div>
          );
        })}
    </section>
  );
};

const mapStateToProps = state => ({
  orderHistory: state.orderHistory
});

export default connect(mapStateToProps)(OrderHistory);
