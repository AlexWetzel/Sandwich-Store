import React, { Component } from 'react';

class OrderItem extends Component {
  render() {
    return(
      <div> 
        <p>
          {this.props.name}          
        </p>
        <button onClick={this.props.onClick}>delete</button>
        <p>{this.props.price}</p>
        <ul>
          {this.props.children}
        </ul>
      </div>
    )
  }
}

export { OrderItem };