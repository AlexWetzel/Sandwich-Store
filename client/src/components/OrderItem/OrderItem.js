import React, { Component } from 'react';
import './orderItem.css';

class OrderItem extends Component {
  render() {
    return(
      <div className="Order-Item clearfix">

        <span className="delete-btn mr-2" onClick={this.props.onClick}>
          <span className="oi oi-x" title="x" aria-hidden="true"></span>
        </span>

        <div className="order-item-info">

          <span className="name h5">
            <strong>
              {this.props.name + " Sandwich"}
            </strong>         
          </span>
  
          <span className="price h5"><strong>{this.props.price}</strong></span>
          
          <ul>
            {this.props.children}
          </ul>

        </div>

      </div>
    )
  }
}

export { OrderItem };