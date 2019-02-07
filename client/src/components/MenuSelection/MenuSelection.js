import React, { Component } from 'react';
import { Item, ItemWrapper } from "./../../components/Item";
import { Ingredient, IngredientWrapper } from "./../../components/Ingredient";

const menuMachine = {
  sandwichPage: {
    NEXT_PAGE: 'saucePage'
  },
  saucePage: {
    NEXT_PAGE: 'cheesePage',
    PREVIOUS_PAGE: 'sandwichPage'
  },
  cheesePage: {
    NEXT_PAGE: 'veggiesPage',
    PREVIOUS_PAGE: 'saucePage'
  },
  veggiesPage: {
    NEXT_PAGE: 'sandwichPage',
    PREVIOUS_PAGE: 'cheesePage'
  }
}

class MenuSelection extends Component {

  state = {
    page: 'sandwichPage',
    orderPage: 0
  }

  transition(action) {
    console.log('transition')
    const currentPage = this.state.page;
    const nextPage = menuMachine[currentPage][action.type];
    console.log(nextPage)
    if (nextPage) {
      this.setState({
        page: nextPage
      })
    }
  }

  nextPage = () => {
    this.transition({ type: 'NEXT_PAGE' });
  };

  previousPage = () => {
    this.transition({ type: 'PREVIOUS_PAGE' });
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
          console.log(ing)
          return (
            <Ingredient
              key={ingredient.name}
              name={ingredient.name}
              imgSrc={this.nameToImgSrc(ingredient.name)}
              stock={ingredient.stock}
              index={ing.indexOf(ingredient.name)}
              onClick={() => this.props.ingredientToggle(ingredient)}
            />
          );
        })}
      </IngredientWrapper>
    );
  };

  render() {
    let ingredients;
    switch (this.state.page) {
      case 'sandwichPage':
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
                  isInStock={checkStock}
                  imgSrc={this.nameToImgSrc(sandwich.type)}
                  addOrderItem={() => this.props.addOrderItem(sandwich, checkStock)}
                  nextPage={this.nextPage}
                />
              );
            })}
          </ItemWrapper>
        );
      case 'saucePage':
        ingredients = this.props.inventory.filter(
          ingredient => ingredient.type === "sauce"
        );
        return <this.ingredientsRender ingredients={ingredients} />;
      case 'cheesePage':
        ingredients = this.props.inventory.filter(
          ingredient => ingredient.type === "cheese"
        );
        return <this.ingredientsRender ingredients={ingredients} />;
      case 'veggiesPage':
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

export default MenuSelection;