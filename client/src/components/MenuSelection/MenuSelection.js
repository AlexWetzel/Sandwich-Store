import React, { Component } from 'react';
import { Item, ItemWrapper } from "./../../components/Item";
import { Ingredient, IngredientWrapper } from "./../../components/Ingredient";
import OrderNumber from "./../../components/OrderNumber";
import ingrStyle from "./../../components/Ingredient/Ingredient.module.css";

class MenuSelection extends Component {

  state = {
    orderPage: 0
  }

  nextPage = () => {
    if (this.state.orderPage === 3) {
      this.setState({ orderPage: 0 });
      return;
    }

    let page = this.state.orderPage;
    page++;
    this.setState({ orderPage: page });
  };

  previousPage = () => {
    let page = this.state.orderPage;
    if (page === 1) {
      const index = this.state.order.length - 1;
      this.deleteSandwich(index);
    }
    page--;
    this.setState({ orderPage: page });
  };


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

  nameToImgSrc = name => {
    let src = name;
    src = src.replace(" ", "_");
    src = "./images/" + src + "_200x120.png";

    return src;
  };

  ingredientsRender = props => {
    return (
      <IngredientWrapper next={this.nextPage} previous={this.previousPage}>
        {props.ingredients.map(ingredient => {
          const ing = this.props.order[this.props.order.length - 1].ingredients;
          return (
            <Ingredient
              key={ingredient.name}
              name={ingredient.name}
              imgSrc={this.nameToImgSrc(ingredient.name)}
              isInStock={
                ingredient.stock > 0 ? "inStock" : ingrStyle.outOfStock
              }
              isselected={
                ing.indexOf(ingredient.name) > -1 ? ingrStyle.selected : ""
              }
              onClick={() => this.props.ingredientToggle(ingredient)}
            />
          );
        })}
      </IngredientWrapper>
    );
  };

  render() {
    let ingredients;
    switch (this.state.orderPage) {
      case 0:
        return (
          <ItemWrapper
            buttonDisplay={this.props.buttonDisplay}
            onClick={this.props.checkout}
          >
            {this.props.menuData.sandwiches.map(sandwich => {
              let checkStock = this.sandwichStock(sandwich.meat);
              return (
                <Item
                  key={sandwich.type}
                  name={sandwich.type}
                  price={sandwich.price}
                  isInStock={
                    checkStock === true ? "inStock" : ingrStyle.outOfStock
                  }
                  imgSrc={this.nameToImgSrc(sandwich.type)}
                  addOrderItem={() => this.props.addOrderItem(sandwich, checkStock)}
                  nextPage={this.nextPage}
                />
              );
            })}
          </ItemWrapper>
        );
      case 1:
        ingredients = this.props.inventory.filter(
          ingredient => ingredient.type === "sauce"
        );
        return <this.ingredientsRender ingredients={ingredients} />;
      case 2:
        ingredients = this.props.inventory.filter(
          ingredient => ingredient.type === "cheese"
        );
        return <this.ingredientsRender ingredients={ingredients} />;
      case 3:
        ingredients = this.props.inventory.filter(
          ingredient => ingredient.type === "veggies"
        );
        return <this.ingredientsRender ingredients={ingredients} />;
      case 5:
        return (
          <OrderNumber orderNumber={this.state.orderNumber} />
        );
      default:
        return (
          <div>
            <p>Something Went Wrong!</p>
            {/* <button onClick={this.reset}>Return</button> */}
          </div>
        );
    }
  }
}

export default MenuSelection;