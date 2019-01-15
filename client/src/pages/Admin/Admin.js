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
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleInventorySubmit = this.handleInventorySubmit.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  state = {
    username: '',
    pin: '',
    counter: 0,
    allowSubmit: true
  }

  componentDidMount() {
    axios.get('/user/').then( res => { 
      console.log(res.data.user);
      if ( res.data.user ) {
        this.login();
      }
    })
    .catch(err => console.log(err));
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
    });
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
      });

    }).catch( err => console.log(err));
  }

  handleInventorySubmit(event) {
    event.preventDefault();

    const inventory = this.props.inventory;

    axios.post('/api/inventory', {
      inventory: inventory
    }).then( res => {
      console.log(res.data.message);
      if ( res.status === 200 ) {
        this.props.getMenuData(function(){
          console.log('Data update complete')
          // const inventory = this.cloneInventory(this.props.inventory);
          // this.setState( () => ({inventory: inventory}));
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

  LoginButton = () => {
    return (
      (this.state.username === '' || this.state.pin === '') 
      ? <button type="button" className="btn btn-secondary btn-lg" disabled>Submit</button>
      : <button type="submit" className="btn btn-primary">Submit</button>
    );    
  }

  InventoryButton = () => {
    return (
      (this.state.allowSubmit === true) 
      ? <button onClick={this.handleInventorySubmit} className="btn btn-primary btn-lg btn-block">Submit</button>
      : <button type="button" className="btn btn-secondary btn-lg btn-block" disabled>Submit</button>
    ); 
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
            <this.LoginButton />
          </form>
        </div>
      </div>
    )
  }

  ControlPanel = () => {

    return(
      <div>
        
        <div className="container">
          <div className="row block pt-3 pb-3">
            <div className="col-12">
              <h3 className="float-left">Control Panel</h3>
              <button onClick={this.logOut} className="btn btn-primary float-right">Log Out</button>
            </div>
          </div>
        

          <div className="row">
            {/* <div className="col-3">
            </div> */}
            <div className="col-12">
              <h2>Inventory</h2>
              <div style={{height: '600px', overflowY: 'scroll'}}>
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
                    {this.props.inventory.map((ingredient, index) => {
                      return(
                        <tr key={ingredient.name}>
                          <th scope="row">{ingredient.name}</th>
                          <td>{ingredient.type}</td>
                          <td>{ingredient.stock}</td>
                          <td>
                            <form onSubmit={e => { e.preventDefault(); }} >
                              <input 
                                className="form-control form-control-sm" 
                                name={ingredient.name}
                                value={ingredient.newStock}
                                type="number"
                                min="0"
                                max="999"
                                onChange={this.props.handleInventoryChange}
                                style={{ width: '70px'}}
                              />
                            </form>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <this.InventoryButton />
            </div>  
          </div>
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