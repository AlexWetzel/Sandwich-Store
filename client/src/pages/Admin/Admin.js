import React, { Component } from 'react';
import axios from 'axios';

const AuthState = {
  isAuthenticated: true,
  login(cb) {
    console.log("Authorize state: true");
    this.isAuthenticated = true;
    return cb();
  },
  logout(cb) {
    this.isAuthenticated = false;
    return cb();
  }
};


class Admin extends Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInventoryChange = this.handleInventoryChange.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleInventorySubmit = this.handleInventorySubmit.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  state = {
    username: '',
    pin: '',
    counter: 0,
    inventory: []
  }

  componentDidMount() {
    axios.get('/user/').then( res => { 
      console.log(res.data.user);
      if ( res.data.user ) {
        this.login();
      }
    })
    .catch(err => console.log(err));
    const inventory = this.cloneInventory(this.props.inventory);
    this.setState({
      inventory: inventory
    });
  }

  cloneInventory = ingredients => {
    const ingrClone = ingredients.map( ingredient => {
      let newObj = Object.assign({}, ingredient);
      newObj.newStock = ingredient.stock;
      return newObj;
    });
    return ingrClone;
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    })
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
      inventory: newInventory
    })
  }

  handleLoginSubmit(event) {
    event.preventDefault();
  
    console.log(this.state.username, this.state.pin);

     axios.post('/user/login', {
      username: this.state.username,
      password: this.state.pin
    }).then( res => {
      console.log(res);

      this.login();
      this.setState({
        username: '',
        pin: ''
      })

    }).catch( err => console.log(err));
  }

  handleInventorySubmit(event) {
    event.preventDefault();

    const inventory = this.state.inventory;

    axios.post('/api/inventory', {
      inventory: inventory
    }).then( res => {
      console.log(res.data.message);
      if ( res.status === 200 ) {
        inventory.forEach( ingredient => {
          const stock = ingredient.stock;
          const newStock = ingredient.newStock;
          if ( stock !== newStock ) {
            ingredient.stock = newStock
          }
        });
        this.setState({
          inventory: inventory
        });
      }

    }).catch( err => console.log(err));
  }

  login = () => {
    console.log('Attempting to authorize');
    AuthState.login(() => {
      this.setState( () => ({
        counter: 1
      }));
    });
  }

  logOut = event => {    
    event.preventDefault();

    axios.post('/user/logout')
      .then( res => {
        AuthState.logout(() => {
          this.setState( () => ({
            counter: 2
          }));
        })
      }).catch( err => console.log(err));
  }

  LoginForm = () => {
    return(
      <div className="container">
        <div className="jumbotron">
          <form onSubmit={this.handleLoginSubmit}>
            <div className="form-group">
              <label htmlFor="username">username</label>
              <input
                type="text"
                name="username"
                value={this.state.username}
                className="form-control"
                onChange={this.handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">pin</label>
              <input
                type="text"
                name="pin"
                value={this.state.pin}
                className="form-control"
                onChange={this.handleInputChange}/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    )
  }

  ControlPanel = () => {
    return(
      <div className="container">
        <div>
          <h1>Control Panel</h1>
          <button onClick={this.logOut} className="btn btn-primary">Log Out</button>
          <table className="table table-sm table-striped">
            <thead>
            <tr>
              <th scope="col">Ingredient</th>
              <th scope="col">Type</th>
              <th scope="col">Current Stock</th>
              <th scope="col">New Stock</th>
            </tr>
            </thead>
            <tbody>
              {this.state.inventory.map((ingredient, index) => {
                return(
                  <tr key={ingredient.name}>
                    <th scope="row">{ingredient.name}</th>
                    <td>{ingredient.type}</td>
                    <td>{ingredient.stock}</td>
                    <td>
                      <form onSubmit={e => { e.preventDefault(); }} >
                        <input 
                          className="form-control form-control-sm col-4" 
                          name={ingredient.name}
                          value={ingredient.newStock}
                          type="number"
                          min="0"
                          max="999"
                          onChange={this.handleInventoryChange}
                        />
                      </form>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <button onClick={this.handleInventorySubmit} className="btn btn-primary">Submit</button>
        </div>
      </div>
    )
  }
  
  render() {
    if (AuthState.isAuthenticated === false) {
      return <this.LoginForm />;
    } else { 
      return <this.ControlPanel /> ;
    } 
  }
  
}

export default Admin;