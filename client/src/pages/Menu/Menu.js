import React, { Component } from "react";
import Order from "./../../components/Order";
import MenuLayout from "./../../components/MenuLayout";
import MenuSelection from "./../../components/MenuSelection";
import OrderNumber from "./../../components/OrderNumber";
import { OrderItem, OrderCustom } from "./../../components/OrderItem";
import { Redirect } from "react-router";
import axios from "axios";

// This component is too big, I'm going to try and clean things up

class Menu extends Component {
  state = {
    order: [],
    timeOver: false,
    total: 0,
    orderNumber: null
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
        order: updateOrder,
        total: updateTotal
      });
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

  // Submit an order
  checkout = () => {
    const data = this.state.order;

    axios
      .post("/api/order", data)
      .then(response => {
        console.log(response);

        this.setState({ orderNumber: response.data.orderNumber });
        this.props.getMenuData(() => {});
        setTimeout(() => {
          this.setState({ timeOver: true });
        }, 5000);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    if (this.state.timeOver === true) {
      return <Redirect to="/" />;
    }

    return (
      <MenuLayout
        menuSelection={
          this.state.orderNumber === null ? (
            <MenuSelection
              orderPage={this.state.orderPage}
              checkout={cb => this.checkout(cb)}
              buttonDisplay={this.state.order.length === 0 ? "d-none" : ""}
              addOrderItem={(sandwich, checkStock) =>
                this.addOrderItem(sandwich, checkStock)
              }
              order={this.state.order}
              ingredientToggle={ingredient => this.ingredientToggle(ingredient)}
              {...this.props}
            />
          ) : (
            <OrderNumber orderNumber={this.state.orderNumber} />
          )
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

export default Menu;
