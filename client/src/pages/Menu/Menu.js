import React, { Component } from "react";
import Order from "./../../components/Order";
import MenuLayout from "./../../components/MenuLayout";
import MenuSelection from "./../../components/MenuSelection";
import OrderNumber from "./../../components/OrderNumber";
import { OrderItem, OrderCustom } from "./../../components/OrderItem";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { removeItem, removeFromStock } from "../../redux/actions";

const mapStateToProps = state => {
  return {
    data: state.data,
    inventory: state.inventory,
    orderNumber: state.orderNumber,
    order: state.order,
    orderSize: state.orderSize
  };
};

// Finite state for menu page
const menuMachine = {
  sandwichPage: {
    NEXT_PAGE: "saucePage"
  },
  saucePage: {
    NEXT_PAGE: "cheesePage",
    PREVIOUS_PAGE: "sandwichPage"
  },
  cheesePage: {
    NEXT_PAGE: "veggiesPage",
    PREVIOUS_PAGE: "saucePage"
  },
  veggiesPage: {
    NEXT_PAGE: "sandwichPage",
    PREVIOUS_PAGE: "cheesePage"
  }
};

class Menu extends Component {
  state = {
    timeOver: false,
    page: "sandwichPage"
  };

  componentDidUpdate(prevProps, prevState) {
    // When all sandwiches get removed from the order, reset the menu page
    if (this.props.order.length === 0 && prevState.page !== "sandwichPage") {
      this.setState({ page: "sandwichPage" });
    }
  }

  transition(action) {
    const currentPage = this.state.page;
    const nextPage = menuMachine[currentPage][action.type];
    if (nextPage) {
      this.setState({ page: nextPage });
    }
  }

  nextPage = () => {
    this.transition({ type: "NEXT_PAGE" });
    // Remove ingredients from the stock after customizing a sandwich
    if (this.state.page === "veggiesPage") {
      this.props.removeFromStock();
    }
  };

  previousPage = () => {
    this.transition({ type: "PREVIOUS_PAGE" });
    // Navigating back from the sauce page should remove the last sandwich
    if (this.state.page === "saucePage") {
      this.props.removeItem(this.props.orderlength - 1);
    }
  };

  removeSandwich = (sandwich, index) => {
    this.props.removeItem(sandwich, index, this.props.orderSize)
    if (index === this.props.orderSize && this.state.page !== "sandwichPage") {
      this.setState({ page: "sandwichPage" });
    };
  }

  // Determine the price of the order
  calculateTotal = () => {
    let total = 0;
    this.props.order.forEach(sandwich => {
      total += sandwich.price;
    });

    return total.toFixed(2);
  };

  render() {
    if (this.state.timeOver === true) {
      return <Redirect to="/" />;
    }

    return (
      <MenuLayout
        menuSelection={
          this.props.orderNumber === null ? (
            <MenuSelection 
              nextPage={this.nextPage}
              previousPage={this.previousPage}
              page={this.state.page}
            />
          ) : (
            <OrderNumber orderNumber={this.props.orderNumber} />
          )
        }
        order={
          <Order total={this.calculateTotal()}>
            {this.props.order.map((sandwich, index) => {
              const ingredients = sandwich.ingredients;
              return (
                <OrderItem
                  name={sandwich.type}
                  key={sandwich.type + index}
                  price={sandwich.price.toFixed(2)}
                  delete={() => this.removeSandwich(sandwich, index)}
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

export default connect(
  mapStateToProps,
  { removeItem, removeFromStock }
)(Menu);
