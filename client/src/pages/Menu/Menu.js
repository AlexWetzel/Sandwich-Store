import React, { Component } from "react";
// import { Link } from 'react-router-dom';
// import { Item, ItemWrapper } from "./../../components/Item";
// import { Ingredient, IngredientWrapper } from "./../../components/Ingredient";
import Order from "./../../components/Order";
// import OrderNumber from "./../../components/OrderNumber";
import MenuLayout from "./../../components/MenuLayout";
import MenuSelection from "./../../components/MenuSelection";
import { OrderItem, OrderCustom } from "./../../components/OrderItem";
import { Redirect } from "react-router";
// import style from "./Menu.module.css";
// import ingrStyle from "./../../components/Ingredient/Ingredient.module.css";
import axios from "axios";

// This component is too big, I'm going to try and clean things up

class Menu extends Component {

  state = {
    order: [],
    timeOver: false,
    orderPage: 0,
    total: 0,
    orderNumber: 0
  };

  // Add or remove an ingredient from a sandwich being customized
  ingredientToggle = ingredient => {
    const size = this.state.order.length - 1;
    // Check if the ingredient is selected for the current sandwich
    const i = this.state.order[size].ingredients.indexOf(ingredient.name);

    // Check the order for the selected ingredient
    if (i === -1) {
      // Check if the topping is in stock
      if (ingredient.stock > 0) {
        ingredient.stock--;
        this.addIngredient(ingredient);
      }
    } else {
      ingredient.stock++;
      this.removeIngredient(i);
    }
  };

  // Add a sandwich to the order
  addOrderItem = (sandwich, isInStock) => {
    if (isInStock) {
      let newSandwich = {
        id: sandwich.id,
        type: sandwich.type,
        meat: sandwich.meat,
        ingredients: [],
        price: sandwich.price
      };

      const newStock = this.props.inventory;

      newSandwich.meat.forEach(meat => {
        let meatStock = newStock.find(
          ingredient => ingredient.name === meat.name
        );
        meatStock.stock -= meat.quantity;
        console.log(meatStock.name, meatStock.stock);
      });

      // Add the sandwich's price to the total price
      let updateTotal = this.state.total;
      updateTotal += sandwich.price;
      // Add the sandwich to the order
      let updateOrder = this.state.order.slice();
      updateOrder.push(newSandwich);

      // Update the state
      this.setState({
        // inventory: newStock,
        order: updateOrder,
        total: updateTotal
      });

      // this.nextPage();
    }
  };

  // Remove a sandwich from an order
  deleteSandwich = i => {
    // Add the sandwich ingredients back to the stock
    const inventory = this.props.inventory;
    const sandwich = this.state.order[i];
    const meats = sandwich.meat;
    const toppings = sandwich.ingredients;
    meats.forEach(meat => {
      let meatStock = inventory.find(
        ingredient => ingredient.name === meat.name
      );
      meatStock.stock += meat.quantity;
      console.log(meatStock.name, meatStock.stock);
    });
    toppings.forEach(topping => {
      let ingredientStock = inventory.find(
        ingredient => ingredient.name === topping
      );
      ingredientStock.stock++;
      console.log(ingredientStock.name, ingredientStock.stock);
    });

    let updateOrder = this.state.order;
    // If the sandwich being deleted is in the process of being customized, if it is last in the array
    updateOrder.splice(i, 1);
    this.setState({
      order: updateOrder
    });

    // Conditions for returning to the first page after removing a sandwich from the order
    // -When the user removes the sandwich they are customizing
    // -When the order is emptied
    if (
      (i === this.state.order.length - 1 && this.state.orderPage < 4) ||
      updateOrder.length === 0
    ) {
      // Display the first order page
      this.setState({ orderPage: 0 });
    }
  };
  // Adds ingredient to the order
  addIngredient = ingredient => {
    let newOrder = this.state.order.slice();
    const size = this.state.order.length - 1;

    newOrder[size].ingredients.push(ingredient.name);
    this.setState({ order: newOrder });
  };
  // Removes ingredient from the order by toggling off from the menu
  removeIngredient = i => {
    let newOrder = this.state.order.slice();
    const size = this.state.order.length - 1;

    newOrder[size].ingredients.splice(i, 1);
    this.setState({ order: newOrder });
  };

  // Removes ingredient from order by hitting delete button in the order panel
  deleteIngredient = (ingredient, i) => {
    const j = this.state.order[i].ingredients.indexOf(ingredient);
    let newOrder = this.state.order.slice();
    newOrder[i].ingredients.splice(j, 1);
    this.setState({ order: newOrder });
  };

  // Determine the price of the order
  calculateTotal = () => {
    let total = 0;
    this.state.order.forEach(sandwich => {
      total += sandwich.price;
    });

    return total.toFixed(2);
  };

  // nextPage = () => {
  //   if (this.state.orderPage === 3) {
  //     this.setState({ orderPage: 0 });
  //     return;
  //   }

  //   let page = this.state.orderPage;
  //   page++;
  //   this.setState({ orderPage: page });
  // };

  // previousPage = () => {
  //   let page = this.state.orderPage;
  //   if (page === 1) {
  //     const index = this.state.order.length - 1;
  //     this.deleteSandwich(index);
  //   }
  //   page--;
  //   this.setState({ orderPage: page });
  // };

  // Re-initialize the menu page
  reset = () => {
    this.setState({
      order: [],
      orderPage: 0
    });
  };

  // Submit an order
  checkout = () => {
    const data = this.state.order;

    axios
      .post("/api/order", data)
      .then(response => {
        console.log(response);

        this.setState({ orderPage: 5, orderNumber: response.data.orderNumber });
        this.props.getMenuData(() => {});
        setTimeout(() => {
          this.setState({ timeOver: true });
        }, 5000);
      })
      .catch(err => {
        console.log(err);
      });
  };

  // sandwichStock = meats => {
  //   let check = true;
  //   meats.forEach(requiredMeat => {
  //     const stockedMeat = this.props.inventory.find(
  //       ingredient => ingredient.name === requiredMeat.name
  //     );

  //     if (requiredMeat.quantity > stockedMeat.stock) {
  //       check = false;
  //     }
  //   });

  //   return check;
  // };

  // nameToImgSrc = name => {
  //   let src = name;
  //   src = src.replace(" ", "_");
  //   src = "./images/" + src + "_200x120.png";

  //   return src;
  // };

  // Determine what gets rendered based on the orderPage variable
  // pageRender = () => {
  //   let ingredients;
  //   switch (this.state.orderPage) {
  //     case 0:
  //       return (
  //         <ItemWrapper
  //           buttonDisplay={this.state.order.length === 0 ? "d-none" : ""}
  //           onClick={this.checkout}
  //         >
  //           {this.props.menuData.sandwiches.map(sandwich => {
  //             let checkStock = this.sandwichStock(sandwich.meat);
  //             return (
  //               <Item
  //                 key={sandwich.type}
  //                 name={sandwich.type}
  //                 price={sandwich.price}
  //                 isInStock={
  //                   checkStock === true ? "inStock" : ingrStyle.outOfStock
  //                 }
  //                 imgSrc={this.nameToImgSrc(sandwich.type)}
  //                 onClick={() => this.addOrderItem(sandwich, checkStock)}
  //               />
  //             );
  //           })}
  //         </ItemWrapper>
  //       );
  //     case 1:
  //       ingredients = this.props.inventory.filter(
  //         ingredient => ingredient.type === "sauce"
  //       );
  //       return <this.ingredientsRender ingredients={ingredients} />;
  //     case 2:
  //       ingredients = this.props.inventory.filter(
  //         ingredient => ingredient.type === "cheese"
  //       );
  //       return <this.ingredientsRender ingredients={ingredients} />;
  //     case 3:
  //       ingredients = this.props.inventory.filter(
  //         ingredient => ingredient.type === "veggies"
  //       );
  //       return <this.ingredientsRender ingredients={ingredients} />;
  //     case 5:
  //       return (
  //         <OrderNumber orderNumber={this.state.orderNumber} />
  //       );
  //     default:
  //       return (
  //         <div>
  //           <p>Something Went Wrong!</p>
  //           <button onClick={this.reset}>Return</button>
  //         </div>
  //       );
  //   }
  // };

  // ingredientsRender = props => {
  //   return (
  //     <IngredientWrapper next={this.nextPage} previous={this.previousPage}>
  //       {props.ingredients.map(ingredient => {
  //         const ing = this.state.order[this.state.order.length - 1].ingredients;
  //         return (
  //           <Ingredient
  //             key={ingredient.name}
  //             name={ingredient.name}
  //             imgSrc={this.nameToImgSrc(ingredient.name)}
  //             isInStock={
  //               ingredient.stock > 0 ? "inStock" : ingrStyle.outOfStock
  //             }
  //             isselected={
  //               ing.indexOf(ingredient.name) > -1 ? ingrStyle.selected : ""
  //             }
  //             onClick={() => this.ingredientToggle(ingredient)}
  //           />
  //         );
  //       })}
  //     </IngredientWrapper>
  //   );
  // };

  render() {
    if (this.state.timeOver === true) {
      return <Redirect to="/" />;
    }

    return (
      <MenuLayout
        menuSelection={
          // <this.pageRender />
          <MenuSelection 
            orderPage={this.state.orderPage}
            checkout={this.checkout}
            buttonDisplay={this.state.order.length === 0 ? "d-none" : ""}
            addOrderItem={(sandwich, checkStock) => this.addOrderItem(sandwich, checkStock)}
            order={this.state.order}
            ingredientToggle={(ingredient) => this.ingredientToggle(ingredient)}

            {...this.props}
          />
        }

        order={
          <Order total={this.calculateTotal()}>
            {this.state.order.map((sandwich, index) => {
              const ingredients = sandwich.ingredients;
              return (
                <OrderItem
                  name={sandwich.type}
                  key={sandwich.type + index}
                  price={sandwich.price.toFixed(2)}
                  delete={() => this.deleteSandwich(index)}
                >
                  {ingredients.map(ingredient => {
                    return <OrderCustom key={ingredient} name={ingredient} />;
                  })}
                </OrderItem>
              );
            })}
          </Order>
        }
      
      /> 
    );
  }
}

/*
Hierarchy

<Menu page>

  <Selection panel>
    <Page render>

      <Item wrapper>
        <Item />
      </Item wrapper>

      -or-

      <Ingredient Wrapper>
        <Ingredient />
      </Ingredient Wrapper>

    </Page render>
  </Selection panel>

  <Order panel>
    <Order Item>
      <Order Custom>
    </Order Item>
  </Order panel>

</Menu page>


*/

export default Menu;
