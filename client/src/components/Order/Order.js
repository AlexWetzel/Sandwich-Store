import React, { Component } from 'react';

class Order extends Component {
  render() {
    return(
      <div className="jumbotron" style={{height: '900px', lineSpacing: 1}}>
        {this.props.children}
        <h4>Total: {this.props.total}</h4>
      </div>
    )
  }
};

export default Order;