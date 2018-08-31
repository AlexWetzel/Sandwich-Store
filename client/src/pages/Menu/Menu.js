import React, { Component } from 'react';
import Item from './../../components/Item';
import Order from './../../components/Order';

class Menu extends Component {
  //Old app stuff goes here
  render() {
    return(
      <div className="row">
        <div className="col-8">
          <h1 classname="m-3" style={{textAlign: 'center'}}>Sandwiches</h1>
          <div className="p-2">
            <div className="row">

              <Item />
              
            </div>
          </div>
        </div>
        <div className="col-4" >
          
          <Order />

        </div>
      </div>
    )
  }
}

export default Menu;