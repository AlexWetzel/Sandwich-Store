import React, { Component } from 'react';
import style from './Order.module.css';

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
      <div className={style.order_panel}>
        <div className={style.order_items} ref={(el) => {this.orderItems = el;}}>
          {this.props.children}
        </div>
        <h2 className={`${style.total} mr-4`}>Total: {"$" + this.props.total}</h2>
      </div>
    )
  }
};

export default Order;