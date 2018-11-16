import React, { Component } from 'react';
import style from './Ingredient.module.css';

class Ingredient extends Component {

  render() {
    return (
      <div className="col-4">
        <div
          className={`${style.panel} m-3 shadow text-center ${this.props.isselected} ${this.props.isInStock}`}
          onClick={this.props.onClick}
        >
          <img
            className={style.image}
            src={this.props.imgSrc}
            alt={this.props.name}
          />          
          <h2>{this.props.name}</h2>
          <p><b>Out of stock</b></p>
        </div>
      </div>
    );
  }
}

export { Ingredient };