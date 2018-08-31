import React, { Component } from 'react';

class Order extends Component {
  render() {
    return(
      <div className="jumbotron" style={{height: '900px', lineSpacing: 1}}>
        <p>Ham Sandwich $5.98</p>            
        <ul style={{listStyleType: 'none'}}>
          <li>Mayo</li>
          <li>Swiss</li>
          <li>Lettuce</li>
          <li>Tomato</li>
        </ul>

      </div>
    )
  }
};

export default Order;