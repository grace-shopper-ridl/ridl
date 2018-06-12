import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const OrderHistory = props => {
  return (
    <section id="orders">
      <h1 id="orders-header">Order History: </h1>
      {props.orderHistory &&
        props.orderHistory.map(order => {
          return (
            <div key={order.id}>
              <Link to={`/orders/${order.id}`}>
                <h2 className="individual-order__id">Order Number #{order.id}</h2>
              </Link>
              <h3>Status: {order.status}</h3>
              <p>${(order.subTotal / 100).toFixed(2)}</p>
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
