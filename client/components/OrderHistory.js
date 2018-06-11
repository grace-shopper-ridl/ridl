import React, {Component} from 'react';
import Price from 'price';
import { connect} from 'react-redux';

const OrderHistory =  (
  <section id="orders">
    <h1 id="orders-header">Order History: </h1>
    {
      orderHistory && orderHistory.map(order => {
        return (
          <div key={order.id}>
            <Link to={`/orders/${order.id}`}>
              <h2 className="individual-order__id">
                {order.id}
              </h2>
            </Link>
            <h3>Status: {order.status}</h3>
            <Price order={{product: order}} />
          </div>
        );
      })
    }
  </section>
);

const mapStateToProps = state => ({
  orderHistory: state.orderHistory
})

export default connect(mapStateToProps)(OrderHistory);
