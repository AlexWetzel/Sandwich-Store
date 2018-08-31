import React, { Component } from 'react';
import Item from './components/Item';
import Order from './components/Order';
import './App.css';

class App extends Component {

  state = {
    sandwiches: [],
    cheese: [],
    vegetables: [],

    menuItems: []
  }

  // ==App functionality==
  //1. A start screen prompts the user to begin their order
  //2. A list of menu items displays different sandwiches that are available. Clicking a sandwich lets you customize with different toppings.
  //3. After clicking a sandwich, a list of ingredients replaces the menu items. The user can freely toggle which ingredients they desire, and can select a prompt to go to the next page.
  //4. The ingredients are separated into dofferent pages in this order: Condiments, Cheese, vegetables
  //5. The order panel on the right side of the page displays the sandwich, with the ingredients under it, that the user has ordered.
  //6. Once the user copletes the order for one sandwich, they are prompted to either order another sandwich or submit their order
  //7. A confirmation screen is displayed for the user to confirm or edit their order if needed.
  //8. After the user submits their order, a thank you message is displayed, and the app returns to the start screen.

  render() {
    return (
      <div className="row">
        <div className="col-8">
          <h1 classname="m-3" style={{textAlign: 'center'}}>Sandwiches</h1>
          <div className="p-2">
            <div className="row">

              <Item />
              
            </div>
          </div>
        </div>
        <div className="col-4" >
          
          <Order />

        </div>
      </div>
    );
  }
}

export default App;
