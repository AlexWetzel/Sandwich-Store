import React, { Component } from "react";
import Order from "./../../components/Order";
import MenuLayout from "./../../components/MenuLayout";
import MenuSelection from "./../../components/MenuSelection";
import OrderNumber from "./../../components/OrderNumber";
import { OrderItem, OrderCustom } from "./../../components/OrderItem";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { removeItem, addIngredient, removeIngredient, sendOrderData } from "../../redux/actions"

const mapStateToProps = state => {
  return {
    data: state.data,
    inventory: state.inventory,
    orderNumber: state.orderNumber,
    order: state.order,
  }
}

class Menu extends Component {
  constructor(props) {
    super(props);

    this.checkout = this.checkout.bind(this);
    // this.addOrderItem = this.addOrderItem.bind(this);
    // this.ingredientToggle = this.ingredientToggle.bind(this);
    // this.deleteSandwich = this.deleteSandwich.bind(this);  
  }
  state = {
    order: [],
    timeOver: false,
    orderNumber: null
  };


  // Determine the price of the order
  calculateTotal = () => {
    let total = 0;
    this.props.order.forEach(sandwich => {
      total += sandwich.price;
    });

    return total.toFixed(2);
  };

  // Submit an order
  checkout = () => {
    const data = this.props.order;
    this.props.sendOrderData(data);
    // axios
    //   .post("/api/order", data)
    //   .then(response => {
    //     console.log(response);

    //     this.setState({ orderNumber: response.data.orderNumber });
    //     // this.props.getMenuData(() => {});
    //     setTimeout(() => {
    //       this.setState({ timeOver: true });
    //     }, 5000);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
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
            <MenuSelection
              checkout={this.checkout}
              // buttonDisplay={this.state.order.length === 0 ? "d-none" : ""}
              // addOrderItem={(sandwich, checkStock) =>
              //   this.addOrderItem(sandwich, checkStock)
              // }
              order={this.state.order}
              // ingredientToggle={ingredient => this.ingredientToggle(ingredient)}
              {...this.props}
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
                  delete={() => this.props.removeItem(index)}
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

export default connect(mapStateToProps, { removeItem, addIngredient, removeIngredient, sendOrderData })(Menu);
