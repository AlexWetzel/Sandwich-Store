import React, { Component } from "react";
import PropTypes from "prop-types";
import { Item, ItemWrapper } from "./../../components/Item";
import { Ingredient, IngredientWrapper } from "./../../components/Ingredient";
import { connect } from "react-redux";
import {
  sendOrderData,
  addItem,
  removeItem,
  addIngredient,
  removeIngredient,
  removeFromStock
} from "../../redux/actions";

const mapStateToProps = state => {
  return {
    sandwiches: state.data.sandwiches,
    ingredients: state.data.ingredients,
    inventory: state.inventory,
    order: state.order,
    orderSize: state.orderSize
  };
};

class MenuSelection extends Component {
 
  // Check if there is sufficient stock to order a sandwich
  sandwichStock = meats => {
    let check = true;
    meats.forEach(requiredMeat => {
      const stockedMeat = this.props.inventory.find(
        ingredient => ingredient.name === requiredMeat.name
      );

      if (requiredMeat.quantity > stockedMeat.stock) {
        check = false;
      }
    });

    return check;
  };

  // Toggle the ingredient for a sandwich
  toggleIngredient = ingredient => {
    const size = this.props.order.length - 1;
    const i = this.props.order[size].ingredients.indexOf(ingredient.name);
    // Check the order for the selected ingredient
    if (i === -1) {
      this.props.addIngredient(ingredient.name);
    } else {
      this.props.removeIngredient(i);
    }
  };

  nameToImgSrc = name => {
    let src = name;
    src = src.replace(" ", "_");
    src = "./images/" + src + "_200x120.png";

    return src;
  };

  isSelected = ingredientName => {
    const order = this.props.order;
    const orderSize = order.length;

    if (orderSize === 0) {
      return false;
    }

    if (order[orderSize - 1].ingredients.indexOf(ingredientName) > -1) {
      return true;
    } else {
      return false;
    }
  };

  ingredientsRender = props => {
    return (
      <IngredientWrapper next={this.props.nextPage} previous={this.props.previousPage}>
        {props.ingredients.map(ingredient => {
          return (
            <Ingredient
              key={ingredient.name}
              name={ingredient.name}
              imgSrc={this.nameToImgSrc(ingredient.name)}
              stock={ingredient.stock}
              isSelected={this.isSelected(ingredient.name)}
              onClick={() => this.toggleIngredient(ingredient)}
            />
          );
        })}
      </IngredientWrapper>
    );
  };

  render() {
    let ingredients;
    switch (this.props.page) {
      case "sandwichPage":
        return (
          <ItemWrapper
            buttonDisplay={this.props.order.length === 0 ? "d-none" : ""}
            checkout={() => this.props.sendOrderData(this.props.order)}
          >
            {this.props.sandwiches.map(sandwich => {
              let checkStock = this.sandwichStock(sandwich.meat);
              return (
                <Item
                  key={sandwich.type}
                  name={sandwich.type}
                  price={sandwich.price}
                  isInStock={checkStock}
                  imgSrc={this.nameToImgSrc(sandwich.type)}
                  addOrderItem={() => this.props.addItem(sandwich)}
                  nextPage={this.props.nextPage}
                />
              );
            })}
          </ItemWrapper>
        );
      case "saucePage":
        ingredients = this.props.inventory.filter(
          ingredient => ingredient.type === "sauce"
        );
        return <this.ingredientsRender ingredients={ingredients} />;
      case "cheesePage":
        ingredients = this.props.inventory.filter(
          ingredient => ingredient.type === "cheese"
        );
        return <this.ingredientsRender ingredients={ingredients} />;
      case "veggiesPage":
        ingredients = this.props.inventory.filter(
          ingredient => ingredient.type === "veggies"
        );
        return <this.ingredientsRender ingredients={ingredients} />;
      default:
        return (
          <div>
            <p>Something Went Wrong!</p>
          </div>
        );
    }
  }
}

MenuSelection.propTypes = {
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
  inventory: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      type: PropTypes.string,
      stock: PropTypes.number
    })
  ),
  order: PropTypes.arrayOf(
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
  nextPage: PropTypes.func,
  previousPage: PropTypes.func,
  page: PropTypes.string,
  sendOrderData: PropTypes.func,
  addItem: PropTypes.func,
  removeItem: PropTypes.func,
  addIngredient: PropTypes.func,
  removeIngredient: PropTypes.func,
  removeFromStock: PropTypes.func,
}

export default connect(
  mapStateToProps,
  { sendOrderData, addItem, removeItem, addIngredient, removeIngredient, removeFromStock }
)(MenuSelection);
