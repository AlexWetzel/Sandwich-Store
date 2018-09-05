import React, { Component } from 'react';

class Ingredient extends Component {

  render() {
    return (
      <div className="col-6">
        <div className="media bg-light m-3">
          <img
            src="https://cdn.shopify.com/s/files/1/0156/0137/products/Lettuce_refill_1200x960.jpg?v=1502103479"
            alt="Lettuce"
            style={{height: '100px'}}
            />
          <div>
            <h1>Igredient</h1>
          </div>
        </div>
      </div>
    );
  }
}

export { Ingredient };