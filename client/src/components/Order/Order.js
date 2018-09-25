import React, { Component } from 'react';
import './order.css';

class Order extends Component {
  render() {
    return(
      <div id="Order" className={"jumbotron " + this.props.orderStyle} style={{height: '900px', lineSpacing: 1}}>
        {this.props.order.map((orderItem, index) => {
          const ingredients = orderItem.ingredients;
          return(
            <div key={orderItem.type + index}> 
              <p>
                {orderItem.type}
                <button 
                  onClick={() => this.props.delSandwich(index)}
                  >delete
                </button>
              </p>
              <p>{orderItem.price.toFixed(2)}</p>
              <ul>
                {ingredients.map(ingredient => {
                  return(
                    <li key={ingredient + index}>{ingredient}
                      <button
                        onClick={() => this.props.delIngredient(ingredient, index)}
                      >Delete</button>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
        <h4>Total: {this.props.total}</h4>
        <button className="checkout-button" onClick={this.props.back}>Back</button>
        <button className="checkout-button">Submit Order</button>
      </div>
    )
  }
};

export default Order;