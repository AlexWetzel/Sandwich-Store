import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './order.css';

class Order extends Component {
  render() {
    return(
      <div id="Order" className={this.props.orderStyle}>
        <div id="order-body">
          <div id="order-items">
            {this.props.children}
          </div>
          <h4 id="total">Total: {this.props.total}</h4>
          <button className="checkout-button" onClick={this.props.back}>Back</button>
          <Link className="checkout-button" to='/submit'><button>Submit Order</button></Link>
        </div>
      </div>
    )
  }
};

export default Order;