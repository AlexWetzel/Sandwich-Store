import React, { Component } from 'react';

class OrderCustom extends Component {
  render() {
    return(
      <li>
        {this.props.name}
        {/* <button onClick={this.props.onClick}>Delete</button> */}
      </li>
    )
  }
}

export { OrderCustom };