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
        <h2 id="total" className="mr-4">Total: {this.props.total}</h2>
      </div>
    )
  }
};

export default Order;