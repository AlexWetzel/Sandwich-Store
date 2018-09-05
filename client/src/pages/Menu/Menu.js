import React, { Component } from 'react';
import { Item, ItemWrapper } from './../../components/Item';
import Order from './../../components/Order';

class Menu extends Component {
  
  // state = {
    
  // }

  render() {
    return(
      <div className="row">
        <ItemWrapper>
          <Item />
        </ItemWrapper>
        <div className="col-4" >
          
          <Order />

        </div>
      </div>
    )
  }
}

export default Menu;