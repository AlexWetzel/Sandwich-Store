import React, { Component } from 'react';
import { Item, ItemWrapper } from './../../components/Item';
import { Ingredient, IngredientWrapper } from './../../components/Ingredient';
import Order from './../../components/Order';


//TODO:
//Add complete order page
// Refactor code to replace orderSize with order array length
// Display only two decimal spaces
// remove sandwich cost from total when removing it

class Menu extends Component {
  
  constructor() {
    super();
    this.orderID = 0;
    // this.orderSize = 0;
  }

  state = {
    menu: {
      sandwiches: [
        {type: "Roast Beef", price: 5.99},
        {type: "Turkey", price: 5.99},
        {type: "Ham", price: 5.99},
        {type: "Ultimate", price: 5.99},
        {type: "Italian", price: 5.99},  
      ],
      sauce: ["Mayonnaise", "Yellow Mustard", "Honey Mustard", "Dijon Mustard", "Horseradish Mayo"],
      cheese: ["Cheddar", "Swiss", "Provolone", "American"],
      veggies: ["Lettuce", "Tomato", "Red Onion", "Pickles", "Olives", "Banana Peppers", "Jalapenos"]
    },
    order: [],
    orderPage: 0,
    total: 0,   
  }

  // For ingredients added to a sandwich, add and remove to the order on click
  ingredientToggle = ingredient => {
    const size = this.state.order.length - 1
    const i = this.state.order[size].ingredients.indexOf(ingredient);
    
    // Check the order for the selected ingredient
    if( i === -1 ) {
      this.addIngredient(ingredient);
    } else {
      this.removeIngredient(i);
    };
  }

  // Add an item to the order
  addOrderItem = item => {
    let orderItem = {
      type: item.type,
      ingredients: [],
      price: item.price
    };

    // Add the item's price to the total price
    let updateTotal = this.state.total;
    updateTotal += orderItem.price;
    // Add the item to the order
    let updateOrder = this.state.order.slice();
    updateOrder.push(orderItem);

    // Update the state
    this.setState({
      order: updateOrder,
      total: updateTotal
    });

    this.nextPage();
  }

  // Remove a sandwich from an order
  removeSandwich = () => {
    let updateOrder = this.state.order.slice();
    updateOrder.pop();
    this.setState({order: updateOrder});
  }

  deleteSandwich = (i, price) => {
    let updateOrder = this.state.order.slice();
    let updateTotal = this.state.total;
    // If the item being deleted is in the process of being customized, if it is last in the array
    if( i === (this.state.order.length - 1)) {
      // Display the first order page
      this.setState({orderPage: 0})
    }
    updateOrder.splice(i, 1);
    updateTotal = updateTotal - price;
    this.setState({
      order: updateOrder,
      total: updateTotal
    });
  }

  addIngredient = ingredient => {
    let newOrder = this.state.order.slice();
    const size = this.state.order.length - 1;

    newOrder[size].ingredients.push(ingredient);
    this.setState({order: newOrder});

    console.log(newOrder);
  }

  removeIngredient = i => {
    let newOrder = this.state.order.slice();
    const size = this.state.order.length - 1;

    newOrder[size].ingredients.splice(i, 1);
    this.setState({order: newOrder});

    console.log(newOrder);
  }

  deleteIngredient = (ingredient, i) => {
    const j = this.state.order[i].ingredients.indexOf(ingredient);
    let newOrder = this.state.order.slice();

    console.log("Ingredient ", ingredient, " is nunber ", j, " on item number ", i);

    // newOrder[i].ingredients.splice(ingredient, 1);
    newOrder[i].ingredients.splice(j, 1);
    this.setState({order: newOrder});
  }

  nextPage = () => {
    let page = this.state.orderPage;
    page++;
    this.setState({orderPage: page});
  }

  previousPage = () => {
    let page = this.state.orderPage;
    if (page === 1){
      this.removeSandwich();
    }
    page--;
    this.setState({orderPage: page});
  }

  moreFood = () => {
    this.setState({ orderPage: 0});
  }
  
  // Re-initialize the menu page
  reset = () => {
    this.setState({
      order: [],
      orderPage: 0
    });
  }

  // Determine what gets rendered based on the orderPage variable
  pageRender = () => {
    let ingredients;
    switch (this.state.orderPage) {
      case 0:
        return(          
          <ItemWrapper>
            {this.state.menu.sandwiches.map(sandwich => {
              return(
                <Item
                  key={sandwich.type}
                  name={sandwich.type}
                  price={sandwich.price}
                  onClick={() => this.addOrderItem(sandwich)}
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
      case 4:
        return(
          <div>
            <button onClick={this.moreFood}>Add More</button>
            <button onClick={this.reset}>Return</button>
            <button>Finish</button>
          </div>
        )
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
          const ing = this.state.order[this.state.order.length - 1].ingredients;
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

  render() {
    return(
      <div className="row">
        <div className="col-8">

          <this.pageRender />

          <this.pageButtons />
        </div>
        <div className="col-4">          
          <Order total={this.state.total}>
            {this.state.order.map((orderItem, index) => {
              const ingredients = orderItem.ingredients;
              return(
                <div key={orderItem.type + index}> 
                  <p>
                    {orderItem.type}
                    <button 
                      onClick={() => this.deleteSandwich(index, orderItem.price)}
                      >delete
                    </button>
                  </p>
                  <p>{orderItem.price}</p>
                  <ul>
                    {ingredients.map(ingredient => {
                      return(
                        <li key={ingredient + index}>{ingredient}
                          <button
                            onClick={() => this.deleteIngredient(ingredient, index)}
                          >Delete</button>
                        </li>
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