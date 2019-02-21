import React, { Component } from "react";
import { Item, ItemWrapper } from "./../../components/Item";
import { Ingredient, IngredientWrapper } from "./../../components/Ingredient";
import { connect } from "react-redux";
import { addItem } from "../../redux/actions"

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

const mapStateToProps = state => {
  return {
    sandwiches: state.data.sandwiches,
    ingredients: state.data.ingredients,
    inventory: state.inventory
  }
}

class MenuSelection extends Component {
  state = {
    page: "sandwichPage",
    orderPage: 0
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.order.length === 0 && prevState.page !== 'sandwichPage') {
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
  };

  previousPage = () => {
    this.transition({ type: "PREVIOUS_PAGE" });
  };

  sandwichPage = () => {
    this.setState({ page: "sandwichPage" })
  }

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

  
  isSelected = ingredientName => {
    const order = this.props.order;
    const orderSize = order.length;

    if (orderSize === 0) {
      return false;
    }

    if (order[orderSize-1].ingredients.indexOf(ingredientName) > -1) {
      return true;
    } else {
      return false;
    }
  }

  ingredientsRender = props => {
    return (
      <IngredientWrapper
        next={this.nextPage}
        previous={this.previousPage}
      >
        {props.ingredients.map(ingredient => {          
          return (
            <Ingredient
              key={ingredient.name}
              name={ingredient.name}
              imgSrc={this.nameToImgSrc(ingredient.name)}
              stock={ingredient.stock}
              isSelected={this.isSelected(ingredient.name)}
              onClick={() => this.props.ingredientToggle(ingredient)}
            />
          )          
        })}
      </IngredientWrapper>
    );
  };

  render() {
    let ingredients;
    switch (this.state.page) {
      case "sandwichPage":
        return (
          <ItemWrapper
            buttonDisplay={this.props.buttonDisplay}
            checkout={this.props.checkout}
          >
            {this.props.sandwiches.map(sandwich => {
              // let checkStock = this.sandwichStock(sandwich.meat);
              return (
                <Item
                  key={sandwich.type}
                  name={sandwich.type}
                  price={sandwich.price}
                  // isInStock={checkStock}
                  imgSrc={this.nameToImgSrc(sandwich.type)}
                  addOrderItem={() =>
                    this.props.addItem(sandwich)
                  }
                  // addOrderItem={() =>
                  //   this.props.addOrderItem(sandwich, checkStock)
                  // }
                  nextPage={this.nextPage}
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

export default connect( mapStateToProps, { addItem })(MenuSelection);
