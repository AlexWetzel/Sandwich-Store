import React, { Component } from 'react';
import { Item, ItemWrapper } from './../../components/Item';
import { Ingredient, IngredientWrapper } from './../../components/Ingredient';
import Order from './../../components/Order';


//TODO:
//Add complete order page
//Add prices to menu items
//Structure each sandwich as a new object?
//Add sandwich to order panel

class Menu extends Component {
  
  constructor() {
    super();
    this.orderID = 0;
    this.orderSize = 0;
  }

  state = {
    menu: {
      sandwiches: ["Roast Beef", "Turkey", "Ham", "Ultimate", "Italian"],
      sauce: ["Mayonnaise", "Yellow Mustard", "Honey Mustard", "Dijon Mustard", "Horseradish Mayo"],
      cheese: ["Cheddar", "Swiss", "Provolone", "American"],
      veggies: ["Lettuce", "Tomato", "Red Onion", "Pickles", "Olives", "Banana Peppers", "Jalapenos"]
    },
    order: [],
    orderPage: 0,    
  }

  ingredientToggle = ingredient => {
    const i = this.state.order[this.orderSize].ingredients.indexOf(ingredient)

    console.log('The index of',ingredient,'In the order array is:', i);

    if( i === -1 ) {
      this.addIngredient(ingredient);
    } else {
      this.removeIngredient(i)
    }
  }

  addSandwich = type => {
    let sandwich = {
      type: type,
      ingredients: [],
      price: 0
    }

    let newSandwich = this.state.order.slice();
    newSandwich.push(sandwich);
    this.setState({order: newSandwich});

    this.nextPage()
  }

  removeSandwich = () => {
    let newSandwich = this.state.order.slice();
    newSandwich.pop();
    this.setState({order: newSandwich});
  }

  addIngredient = ingredient => {
    let newOrder = this.state.order.slice();
    const size = this.orderSize;

    newOrder[size].ingredients.push(ingredient);
    this.setState({order: newOrder});

    console.log(newOrder);
  }

  removeIngredient = i => {
    let newOrder = this.state.order.slice();
    const size = this.orderSize;

    newOrder[size].ingredients.splice(i, 1);
    this.setState({order: newOrder})

    console.log(newOrder);
  }

  nextPage = () => {
    let page = this.state.orderPage
    page++;
    this.setState({orderPage: page});
  }

  previousPage = () => {
    let page = this.state.orderPage
    if (page === 1){
      this.removeSandwich();
    }
    page--;
    this.setState({orderPage: page});
  }

  pageRender = () => {
    let ingredients;
    switch (this.state.orderPage) {
      case 0:
        return(          
          <ItemWrapper>
            {this.state.menu.sandwiches.map(sandwich => {
              return(
                <Item
                  key={sandwich}
                  name={sandwich}
                  onClick={() => this.addSandwich(sandwich)}
                />
              )
            })}
          </ItemWrapper>
        );
      case 1:
        ingredients = this.state.menu.sauce;
        return(<this.ingredientsRender ingredients={ingredients}/>)
      case 2:
        ingredients = this.state.menu.cheese;
        return(<this.ingredientsRender ingredients={ingredients}/>)
      case 3:
        ingredients = this.state.menu.veggies;
        return(<this.ingredientsRender ingredients={ingredients}/>)
      default:
        return(
          <div>
            <p>Something Went Wrong!</p>
            <button onClick={this.reset}>Return</button>
          </div>
        );
    }
  }

  ingredientsRender = props => {

    console.log(props.ingredients);
    return(
      <IngredientWrapper 
        onClick={() => this.nextPage()}
      >
        {props.ingredients.map(ingredient => {
          const ing = this.state.order[this.orderSize].ingredients;
          return(
            <Ingredient
              key={ingredient}
              name={ingredient}
              onClick={() => this.ingredientToggle(ingredient)}
              isselected={ing.indexOf(ingredient) > -1 ? 'selected' : ''}
            />
          )
        })} 
      </IngredientWrapper>
    )
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

  reset = () => {
    this.setState({
      order: [],
      orderPage: 0
    })
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
              const ingredients = orderItem.ingredients;
              return(
                <div key={orderItem.type}> 
                  <p>
                    {orderItem.type}
                  </p>
                  <ul>
                    {ingredients.map(ingredient => {
                      return(
                        <li key={ingredient + this.orderSize}>{ingredient}</li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </Order>
        </div>
      </div>
    )
  }
}

export default Menu;