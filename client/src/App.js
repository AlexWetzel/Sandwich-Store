import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Start from './pages/Start';
import Menu from './pages/Menu';
import Submit from './pages/Submit';
import './App.css';

class App extends Component {

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
      <Router>
        <Switch>
          <Route exact path="/" component={Start} />
          <Route exact path="/menu" component={Menu} />
          <Route exact path="/submit" component={Submit} />
        </Switch>
      </Router>
    );
  }
}

export default App;
