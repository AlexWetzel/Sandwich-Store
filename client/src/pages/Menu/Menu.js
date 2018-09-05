import React, { Component } from 'react';
import { Item, ItemWrapper } from './../../components/Item';
import { Ingredient, IngredientWrapper } from './../../components/Ingredient';
import Order from './../../components/Order';

class Menu extends Component {
  
  // constructor() {
  //   super();
  // }
  state = {
    ingredients: [],
    count: 0
  }

  ingredientToggle = () => {
    console.log('click');
  }

  render() {
    return(
      <div className="row">
        <button
          onClick={this.ingredientToggle}        
        >click</button>
        <ItemWrapper>
          <Item />
        </ItemWrapper>

        {/* <IngredientWrapper> */}
          <Ingredient
            name={'Lettuce'}
            onClick={this.ingredientToggle}
          />
        {/* </IngredientWrapper> */}
        <div className="col-4">
          
          <Order />

        </div>
      </div>
    )
  }
}

export default Menu;