import React, { Component } from 'react';
import './orderItem.css';

class OrderItem extends Component {
  render() {
    return(
      <div className="OrderItem">
        <span className="name">
          <strong>
            {this.props.name + " Sandwich"}
          </strong>         
        </span>
        <span className="delete-btn ml-3" onClick={this.props.onClick}>X</span>
        <span className="price"><strong>{this.props.price}</strong></span>
        <ul>
          {this.props.children}
        </ul>
      </div>
    )
  }
}

export { OrderItem };