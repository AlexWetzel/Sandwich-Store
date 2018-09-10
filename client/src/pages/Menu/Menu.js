import React, { Component } from 'react';
import { Item, ItemWrapper } from './../../components/Item';
import { Ingredient, IngredientWrapper } from './../../components/Ingredient';
import Order from './../../components/Order';

class Menu extends Component {
  
  // constructor() {
  //   super();
  //   const sequence = ['sadwich', 'veggies'];
  // }

  state = {
    menu: {
      sandwiches: ["Roast Beef", "Turkey", "Ham", "Ultimate", "Italian"],
      sauce: ["Mayonnaise", "Yellow Mustard", "Honey Mustard", "Dijon Mustard", "Horseradish Mayo"],
      cheese: ["Cheddar", "Swiss", "Provolone", "American"],
      veggies: ["Lettuce", "Tomato", "Red Onion", "Pickles", "Olives", "Banana Peppers", "Jalapenos"]
    },
    ingredients: ['Lettuce'],
    order: [],
    orderPage: 0
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

  nextPage = () => {
    let page = this.state.orderPage
    page++;
    this.setState({orderPage: page});
  }

  previousPage = () => {
    let page = this.state.orderPage
    page--;
    this.setState({orderPage: page});
  }

  pageRender = () => {
    switch (this.state.orderPage) {
      case 0:
        return(          
          <ItemWrapper>
            <Item

              onClick={() => this.nextPage()}
            />
          </ItemWrapper>
        );
      case 1:
        return(
          <IngredientWrapper 
            onClick={() => this.nextPage()}
          >
            {this.state.menu.sauce.map(ingredient => {
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
        )    
      case 2:
        return(
          <IngredientWrapper 
            onClick={() => this.nextPage()}
          >
            {this.state.menu.cheese.map(ingredient => {
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
        )    
      case 3:
        return(
          <IngredientWrapper 
            onClick={() => this.nextPage()}
          >
            {this.state.menu.veggies.map(ingredient => {
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
        )    
      default:
        return(
          <p>Nothing happened</p>
        );
    }
  }

  pageButtons = () => {
    if (this.state.orderPage !== 0) {
      return(
        <div className="row">
          <div className="col-12">
            <button onClick={this.previousPage}>Back</button>
            <button onClick={this.nextPage}>Next</button>
          </div>
        </div>
      )
    } else {
      return null;
    }
  }

  render() {
    return(
      <div className="row">
        <div className="col-8">

          <this.pageRender />

          <this.pageButtons />
        </div>
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