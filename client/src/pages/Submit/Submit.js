import React, { Component } from 'react';

class Submit extends Component {

  orderNumber = () => {
    return Math.floor(Math.random() * 100) + 1;
  }

  render() {
    return(
      <div id="Submit">
        <h1>Your order number is:</h1>
        <h1>{'#' + this.orderNumber()}</h1>
      </div>
    )
  }
}

export default Submit;