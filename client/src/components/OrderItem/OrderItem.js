import React, { Component } from 'react';
import './orderItem.css';

class OrderItem extends Component {
  render() {
    return(
      <div className="OrderItem">
        <span className="name">
          {this.props.name + " Sandwich"}          
        </span>
        <span className="delete-btn ml-3" onClick={this.props.onClick}>X</span>
        <span className="price">{this.props.price}</span>
        <ul>
          {this.props.children}
        </ul>
      </div>
    )
  }
}

export { OrderItem };