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

  ingredientToggle = ingredient => {
    const i = this.state.order.indexOf(ingredient)

    console.log('The index of',ingredient,'In the order array is:', i);

    if( i === -1 ) {
      this.addIngredient(ingredient);
    } else {
      this.removeIngredient(i)
    }
  }

  addIngredient = ingredient => {
    let newOrder = this.state.order.slice();
    newOrder.push(ingredient);
    this.setState({order: newOrder});
  }

  removeIngredient = i => {
    let newOrder = this.state.order.slice();
    newOrder.splice(i, 1);
    this.setState({order: newOrder})
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
              isselected={this.state.order.indexOf(ingredient) > -1 ? 'selected' : ''}
            />
            )
          })}
 
        </IngredientWrapper>
        <div className="col-4">          
          <Order>
            {this.state.order.map(orderItem => {
              return(
                <li>{orderItem}</li>
              )
            })}
          </Order>
        </div>
      </div>
    )
  }
}

export default Menu;