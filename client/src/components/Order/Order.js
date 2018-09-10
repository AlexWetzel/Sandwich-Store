import React, { Component } from 'react';

class Order extends Component {
  render() {
    return(
      <div className="jumbotron" style={{height: '900px', lineSpacing: 1}}>
        {this.props.children}
      </div>
    )
  }
};

export default Order;