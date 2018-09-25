import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './order.css';

class Order extends Component {
  render() {
    return(
      <div id="Order" className={"jumbotron " + this.props.orderStyle} style={{height: '900px', lineSpacing: 1}}>
        {this.props.children}
        <h4>Total: {this.props.total}</h4>
        <button className="checkout-button" onClick={this.props.back}>Back</button>
        <Link className="checkout-button" to='/submit'><button>Submit Order</button></Link>
      </div>
    )
  }
};

export default Order;