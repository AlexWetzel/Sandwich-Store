import React, { Component } from 'react';
import { Item, ItemWrapper } from './../../components/Item';
import { Ingredient, IngredientWrapper } from './../../components/Ingredient';
import Order from './../../components/Order';

class Menu extends Component {
  
  // constructor() {
  //   super();
  // }
  state = {
    ingredients: ['Lettuce'],
    count: 0,
    order: []
  }

  ingredientToggle = name => {
    console.log('click');
    console.log(name);
  }

  render() {
    return(
      <div className="row">
        <ItemWrapper>
          <Item />
        </ItemWrapper>

        <IngredientWrapper>
          {this.state.ingredients.map(ingredient => {
            return(
              <Ingredient
              key={ingredient}
              name={ingredient}
              onClick={() => this.ingredientToggle(ingredient)}
              // isSelected={}
            />
            )
          })}
 
        </IngredientWrapper>
        <div className="col-4">
          
          <Order />

        </div>
      </div>
    )
  }
}

export default Menu;