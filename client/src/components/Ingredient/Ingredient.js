import React, { Component } from 'react';
import './ingredient.css';

class Ingredient extends Component {

  render() {
    return (
      <div className="col-4">
        <div
          className={"Ingredient m-3 shadow text-center " + this.props.isselected}
          onClick={this.props.onClick}
        >
          <img
            src={this.props.imgSrc}
            alt="Lettuce"
            style={{height: '100px'}}
          />          
          <h3>{this.props.name}</h3>
        </div>
      </div>
    );
  }
}

export { Ingredient };