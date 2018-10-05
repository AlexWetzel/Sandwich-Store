import React, { Component } from 'react';
import { Item, ItemWrapper } from './../../components/Item';
import { Ingredient, IngredientWrapper } from './../../components/Ingredient';
import Order from './../../components/Order';
import { OrderItem, OrderCustom } from './../../components/OrderItem';
import './menu.css';
//TODO:
//Add complete order page

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
      cheese: ["Cheddar", "Swiss", "Provolone"],
      veggies: ["Lettuce", "Tomato", "Red Onion", "Pickles", "Olives", "Banana Peppers", "Jalapenos"]
    },
    order: [],

    // order: [{
    //   type: "test",
    //   ingredients: [
    //     "ingredient",
    //     "ingredient",
    //     "ingredient",
    //     "ingredient",
    //     "ingredient",
    //     "ingredient",
    //     "ingredient",
    //     "ingredient",
    //     "ingredient",
    //     "ingredient",
    //     "ingredient",
    //     "ingredient",
    //     "ingredient",
    //     "ingredient",
    //     "ingredient",
    //     "ingredient",
    //     "ingredient",
    //     "ingredient",
    //     "ingredient",
    //     "ingredient",
    //     "ingredient",
    //     "ingredient",
    //     "ingredient",
    //     "ingredient",
    //     "ingredient",
    //     "ingredient",
    //     "ingredient",
    //     "ingredient",
    //     "ingredient",
    //     "ingredient",
    //     "ingredient",
    //     "ingredient",
    //     "ingredient",
    //     "ingredient",
    //     "ingredient",
    //     "ingredient",
    //     "ingredient",
    //     "ingredient",
    //     "ingredient",
    //     "ingredient"
    // ],
    //   price: 9999.99


    // }],


    orderPage: 4,
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

  // removeSandwich = () => {
  //   let updateOrder = this.state.order.slice();
  //   updateOrder.pop();
  //   this.setState({order: updateOrder});
  // }

  deleteSandwich = i => {
    let updateOrder = this.state.order.slice();
    // If the item being deleted is in the process of being customized, if it is last in the array
    if( i === (this.state.order.length - 1)) {
      // Display the first order page
      this.setState({orderPage: 0})
    }
    updateOrder.splice(i, 1);
    this.setState({
      order: updateOrder
    });
  }

  addIngredient = ingredient => {
    let newOrder = this.state.order.slice();
    const size = this.state.order.length - 1;

    newOrder[size].ingredients.push(ingredient);
    this.setState({order: newOrder});
  }

  removeIngredient = i => {
    let newOrder = this.state.order.slice();
    const size = this.state.order.length - 1;

    newOrder[size].ingredients.splice(i, 1);
    this.setState({order: newOrder});
  }

  deleteIngredient = (ingredient, i) => {
    const j = this.state.order[i].ingredients.indexOf(ingredient);
    let newOrder = this.state.order.slice();

    console.log("Ingredient ", ingredient, " is nunber ", j, " on item number ", i);

    // newOrder[i].ingredients.splice(ingredient, 1);
    newOrder[i].ingredients.splice(j, 1);
    this.setState({order: newOrder});
  }

  calculateTotal = () => {
    let total = 0;
    this.state.order.forEach(item => {
      total += item.price;
    });

    return total.toFixed(2);
  }

  nextPage = () => {
    let page = this.state.orderPage;
    page++;
    this.setState({orderPage: page});
  }

  previousPage = () => {
    let page = this.state.orderPage;
    if (page === 1){
      const index = this.state.order.length - 1;
      this.deleteSandwich(index);
      // this.removeSandwich();
    }
    page--;
    this.setState({orderPage: page});
  }

  // checkout = () => {
  //   this.setState({orderPage: 99});
  // }


  moreFood = () => {
    this.setState({orderPage: 0});
  }
  
  // Re-initialize the menu page
  reset = () => {
    this.setState({
      order: [],
      orderPage: 0
    });
  }

  nameToImgSrc = name => {
    let src = name;
    src = src.replace(" ", "_");
    src = "./images/" + src + ".png";

    return src;
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
                  imgSrc={this.nameToImgSrc(sandwich.type)}
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
          <div className="row">
            <div className="col-4 offset-2" style={{marginTop: "100px"}}>
              <div
                className="panel m-3 shadow text-center"
                onClick={this.moreFood}                
              >
                <img
                  src={this.nameToImgSrc('turkey')}
                  alt="Add More"
                />          
                <h2>Add More</h2>
              </div>
            </div>
            <div className="col-4" style={{marginTop: "100px"}}>
              <div
                className="panel m-3 shadow text-center"
                onClick={this.nextPage}
              >
                <img
                  src={this.nameToImgSrc('turkey')}
                  alt="Check Out"
                />          
                <h2>Check Out</h2>
              </div>
            </div>
            <div className="col-4 offset-2">
              <div
                className="panel m-3 shadow text-center"
                onClick={this.reset}                
              >
                <img
                  src={this.nameToImgSrc('turkey')}
                  alt="Reset"
                />          
                <h2>Reset</h2>
              </div>
            </div>
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
    return(
      <IngredientWrapper 
        next={this.nextPage}
        previous={this.previousPage}
      >
        {props.ingredients.map(ingredient => {
          const ing = this.state.order[this.state.order.length - 1].ingredients;
          return(
            <Ingredient
              key={ingredient}
              name={ingredient}
              imgSrc={this.nameToImgSrc(ingredient)}
              onClick={() => this.ingredientToggle(ingredient)}
              isselected={ing.indexOf(ingredient) > -1 ? 'selected' : ''}
            />
          )
        })} 
      </IngredientWrapper>
    )
  } 

  render() {
    return(
      <div id="Menu" className="row justify-content-start" style={{margin: '0px'}}>
        <div className="main col-7 offset-1">
          <this.pageRender />
        </div>
        <div>
          <Order
            orderStyle={this.state.orderPage !== 5 ? 'side-bar' : 'checkout'}
            total={this.calculateTotal()}
            back={this.previousPage}
          >
            {this.state.order.map((orderItem, index) => {
              const ingredients = orderItem.ingredients;
              return(
                <OrderItem
                  name={orderItem.type}
                  key={orderItem.type + index}
                  price={orderItem.price.toFixed(2)}
                  onClick={() => this.deleteSandwich(index)}
                >
                  {ingredients.map(ingredient => {
                    return(
                      <OrderCustom
                        key={ingredient}
                        name={ingredient}
                        onClick={() => this.deleteIngredient(ingredient, index)}
                      />
                    );
                  })}
                </OrderItem>
              );
            })}
          </Order>         
        </div>
      </div>
    )
  }
}

export default Menu;