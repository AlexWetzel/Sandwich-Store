import React, { Component } from "react";
import PropTypes from "prop-types";
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
      const i = this.props.orderSize;
      const sandwich = this.props.order[i];
      this.props.removeItem(sandwich, i, i);
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

  submitThenRedirect = () => {
    setTimeout( () => this.setState({timeOver: true}), 5000 );

    if (this.state.timeOver === true) {
      return <Redirect to="/" />;
    }
 
    return <OrderNumber orderNumber={this.props.orderNumber} />;
  }

  render() {
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
            <this.submitThenRedirect />
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

Menu.propType = {
  data: PropTypes.shape({
    sandwiches: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        price: PropTypes.number,
        meats: PropTypes.arrayOf(PropTypes.shape({
          name: PropTypes.string,
          quantity: PropTypes.number
        }))
      })
    ),
    ingredients: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        type: PropTypes.string,
        stock: PropTypes.number
      })
    ),
  }),
  inventory: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      type: PropTypes.string,
      stock: PropTypes.number
    })
  ),
  orderNumber: PropTypes.number,
  order:  PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      type: PropTypes.string,
      price: PropTypes.number,
      meat: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          quantity: PropTypes.number
        })
      ),
      ingredients: PropTypes.arrayOf(PropTypes.string)
    })
  ),
  orderSize: PropTypes.number,
  removeItem: PropTypes.func,
  removeFromStock: PropTypes.func
}

export default connect(
  mapStateToProps,
  { removeItem, removeFromStock }
)(Menu);
