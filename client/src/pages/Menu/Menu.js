import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { Item, ItemWrapper } from './../../components/Item';
import { Ingredient, IngredientWrapper } from './../../components/Ingredient';
import Order from './../../components/Order';
import { OrderItem, OrderCustom } from './../../components/OrderItem';
import { Redirect } from 'react-router';
import style from './Menu.module.css';
import ingrStyle from './../../components/Ingredient/Ingredient.module.css'

class Menu extends Component {
  
  constructor() {
    super();
    this.orderID = 0;
  }

  state = {
    menu: {
      sandwiches: [
        {type: "Roast Beef", price: 5.99},
        {type: "Turkey", price: 5.99},
        {type: "Ham", price: 5.99},
        {type: "Ultimate", price: 5.99},
        {type: "Italian", price: 5.99},  
        {type: "Italian", price: 5.99},  
        {type: "Italian", price: 5.99},  
      ],
      sauce: ["Mayonnaise", "Yellow Mustard", "Honey Mustard", "Dijon Mustard", "Horseradish Mayo"],
      cheese: ["Cheddar", "Swiss", "Provolone"],
      veggies: ["Lettuce", "Tomato", "Red Onion", "Pickles", "Olives", "Banana Peppers", "Jalapenos"]
    },
    order: [],
    timeOver: false,
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
  deleteSandwich = i => {
    let updateOrder = this.state.order.slice();
    // If the item being deleted is in the process of being customized, if it is last in the array
    updateOrder.splice(i, 1);
    this.setState({
      order: updateOrder
    });
    // Conditions for returning to the first page after removing an item from the order
    // -When the user removes the item they are customizing
    // -When the order is emptied
    if( (i === (this.state.order.length - 1) && this.state.orderPage < 4) || updateOrder.length === 0 ){
      // Display the first order page
      this.setState({orderPage: 0});
    }
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

    if(this.state.orderPage === 3) {
      this.setState({orderPage: 0});
      return;
    }

    let page = this.state.orderPage;
    page++;
    this.setState({orderPage: page});
  }

  previousPage = () => {
    let page = this.state.orderPage;
    if (page === 1){
      const index = this.state.order.length - 1;
      this.deleteSandwich(index);
    }
    page--;
    this.setState({orderPage: page});
  }

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

  checkout = () => {
    this.setState({orderPage: 5})   

    setTimeout(() => {
      this.setState({timeOver: true});
    }, 5000)
  }

  nameToImgSrc = name => {
    let src = name;
    src = src.replace(" ", "_");
    src = "./images/" + src + "_200x120.png";

    return src;
  }

    orderNumber = () => {
    return Math.floor(Math.random() * 100) + 1;
  }

  // Determine what gets rendered based on the orderPage variable
  pageRender = () => {
    let ingredients;
    switch (this.state.orderPage) {
      case 0:
        return(          
          <ItemWrapper
            buttonDisplay={this.state.order.length === 0 ? 'd-none' : ''}
            onClick={this.checkout}
          >
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
      case 5:
        return(
          <div className={`${style.submit} text-center`}>
            <h1 className="display-3 mb-5">Thank You!</h1>
            <div className={`${style.order_num_panel} shadow p-3`}>
              <h1>Your order number is:</h1>
              <h1 className={`${style.order_num} display-3`}>{'#' + this.orderNumber()}</h1>
            </div>
          </div>
        );
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
              isselected={ing.indexOf(ingredient) > -1 ? ingrStyle.selected : ''}
            />
          )
        })} 
      </IngredientWrapper>
    )
  } 

  render() {
    if (this.state.timeOver === true) {
      return(<Redirect to='/' />);
    }

    return(
      <div className="row justify-content-start">
        <div className="col-9">
          <div className={style.menu_container}>
          <this.pageRender />
          </div>
        </div>
        
        <Order
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
    )
  }
}

export default Menu;