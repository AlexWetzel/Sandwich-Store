import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Start from './pages/Start';
import Menu from './pages/Menu';
import Admin from './pages/Admin';
import ControlPanel from './pages/ControlPanel';
import './App.css';
import axios from 'axios';

class App extends Component {

  state = {
    data: null,
    inventory: []
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

  componentDidMount() {
    this.getMenuData();
    axios.get('/user/').then( res => { console.log(res)})
    .catch(err => console.log(err));
  }
  
  getMenuData = () => {
    axios.get("/api/menu")
    .then(res => {
      console.log('Menu Data:', res.data);
      const inventory = this.cloneIngredients(res.data.ingredients);
      this.setState({
        data: res.data,
        inventory: inventory
      });
      console.log('Inventory:', this.state.inventory);
    }).catch( err => console.log(err));
  }

  cloneIngredients = ingredients => {
    const ingrClone = ingredients.map( ingredient => {
      return Object.assign({}, ingredient);
    });

    return ingrClone
  }

  menuRender = (props) => {
    if (this.state.data) {
      return <Menu {...props}
        menuData={this.state.data}
        inventory={this.state.inventory}
        getMenuData={() => this.getMenuData()}
        />
    }

    return <h1>{'Loading ....'}</h1>
  }

  render() {

    return (
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route exact path="/" component={Start} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/controlpanel" component={ControlPanel} />

          <Route 
            exact path="/menu" 
            render={(props) => this.menuRender(props)} />
          {/* <Route exact path="/menu" component={Menu} /> */}
        </Switch>
      </Router>
    );
  }
}

export default App;
