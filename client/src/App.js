import React, { Component } from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import Start from './pages/Start';
import Menu from './pages/Menu';
// import Admin from './pages/Admin';
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
    axios.get("/api/test").then(res => {
      console.log(res.data, "hello")

    }).catch( err => console.log(err));

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
        getMenuData={() => this.getMenuData()}
        />
    }

    return <h1>{'Loading ....'}</h1>
  }

  handleInventoryChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    const newInventory = this.state.inventory;

    newInventory.forEach( ingredient => {
      if( ingredient.name === name ){
        ingredient.newStock = value;
      }
    });

    this.setState({
      inventory: newInventory,
    });
  }

  render() {

    return (

      <h1>TEST Test</h1>

      // <Router basename={process.env.PUBLIC_URL}>
      //   <Switch>
      //     <Route exact path="/" component={Start} />
      //     <Route 
      //       exact path="/admin" 
      //       render={(props) => 
      //         <Admin {...props}
      //           inventory={this.state.inventory}
      //           getMenuData={(cb) => this.getMenuData(cb)}
      //           handleInventoryChange={(event) => this.handleInventoryChange(event)}
      //         />
      //       }
      //     />
      //     <Route 
      //       exact path="/menu" 
      //       render={(props) => this.menuRender(props)} 
      //     />
      //   </Switch>
      // </Router>
    );
  }
}

export default App;
