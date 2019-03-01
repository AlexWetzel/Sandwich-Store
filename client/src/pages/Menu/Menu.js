import React, { Component } from "react";
import Order from "./../../components/Order";
import MenuLayout from "./../../components/MenuLayout";
import MenuSelection from "./../../components/MenuSelection";
import OrderNumber from "./../../components/OrderNumber";
import { OrderItem, OrderCustom } from "./../../components/OrderItem";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { removeItem } from "../../redux/actions";

const mapStateToProps = state => {
  return {
    data: state.data,
    inventory: state.inventory,
    orderNumber: state.orderNumber,
    order: state.order,
    orderSize: state.orderSize
  };
};

class Menu extends Component {
  state = {
    timeOver: false
  };

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
    // if (this.state.timeOver === true) {
    //   return <Redirect to="/" />;
    // }

    return (
      <MenuLayout
        menuSelection={
          this.props.orderNumber === null ? (
            <MenuSelection />
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
                  delete={() => this.props.removeItem(index, this.props.orderSize)}
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
  { removeItem }
)(Menu);
