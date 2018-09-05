import React, { Component } from 'react';
import { Item, ItemWrapper } from './../../components/Item';
import { Ingredient, IngredientWrapper } from './../../components/Ingredient';
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

        <IngredientWrapper>
          <Ingredient />
        </IngredientWrapper>
        <div className="col-4" >
          
          <Order />

        </div>
      </div>
    )
  }
}

export default Menu;