import React, { Component } from 'react';
import './orderItem.css';

class OrderItem extends Component {
  render() {
    return(
      <div className="OrderItem">
        <span className="name">
          {this.props.name + " Sandwich"}          
        </span>
        <button className="delete-btn" onClick={this.props.onClick}>delete</button>
        <p className="price">{this.props.price}</p>
        <ul>
          {this.props.children}
        </ul>
      </div>
    )
  }
}

export { OrderItem };