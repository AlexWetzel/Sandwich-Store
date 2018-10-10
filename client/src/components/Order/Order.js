import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './order.css';

class Order extends Component {
  componentDidMount() {
    this.bottom();
  }

  componentDidUpdate() {
    this.bottom();
  }

  bottom = () => {
    const scrollHeight = this.orderItems.scrollHeight;
    const height = this.orderItems.clientHeight;
    const maxScrollTop = scrollHeight - height;
    this.orderItems.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }

  render() {
    return(
      <div id="Order" className={this.props.orderStyle}>
        <div id="order-items" ref={(el) => {this.orderItems = el;}}>
          {this.props.children}
        </div>
        <h4 id="total">Total: {this.props.total}</h4>
        {/* <button className="checkout-button" onClick={this.props.back}>Back</button> */}
        <button onClick={this.bottom}>bottom</button>
        <Link className="checkout-button" to='/submit'><button>Submit Order</button></Link>
      </div>
    )
  }
};

export default Order;