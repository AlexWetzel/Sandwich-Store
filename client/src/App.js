import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Start from './pages/Start';
import Menu from './pages/Menu';
import Admin from './pages/Admin';
import './App.css';
import axios from 'axios';

class App extends Component {

  state = {
    data: null,
    inventory: [],
    counter: 0
  }

  componentDidMount() {
    this.getMenuData(() => {});
  }
  
  getMenuData = callback => {
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

    return callback();
  }

  cloneIngredients = ingredients => {
    const ingrClone = ingredients.map( ingredient => {
      let newObj = Object.assign({}, ingredient);
      newObj.newStock = ingredient.stock;
      return newObj;
    });
    return ingrClone;
  }
  
  menuRender = (props) => {
    if (this.state.data) {
      return <Menu {...props}
        menuData={this.state.data}
        inventory={this.state.inventory}
        getMenuData={(cb) => this.getMenuData(cb)}
        />
    }

    return <h1>{'Loading ....'}</h1>
  }

  handleInventoryChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    const inventory = this.state.inventory;

    const newInventory = inventory.map( ingredient => {
      if( ingredient.name === name ){
        return Object.assign({}, ingredient, {newStock: value});
      } else {
        return Object.assign({}, ingredient);
      }
    });

    this.setState({
      inventory: newInventory,
    });
  }

  render() {

    return (
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route exact path="/" component={Start} />
          <Route 
            exact path="/admin" 
            render={(props) => 
              <Admin {...props}
                inventory={this.state.inventory}
                getMenuData={(cb) => this.getMenuData(cb)}
                handleInventoryChange={(event) => this.handleInventoryChange(event)}
              />
            }
          />
          <Route 
            exact path="/menu" 
            render={(props) => this.menuRender(props)} 
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
