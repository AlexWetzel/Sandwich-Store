import React, { Component } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';

const AuthState = {
  isAuthenticated: false,
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
    this.handleSubmit = this.handleSubmit.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  state = {
    username: '',
    pin: '',
    counter: 0
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

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    })
  }

  handleSubmit(event) {
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

  login = () => {
    console.log('Attempting to authorize');
    AuthState.login(() => {
      console.log('Executing Callback');
      // let n = this.state.counter
      // n++
      this.setState( () => ({
        counter: 1
      }));
    });
  }

  logOut = (event) => {
    
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
          <form onSubmit={this.handleSubmit}>
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
      <div>
        <h1>Control Panel</h1>
        <button onClick={this.logOut} className="btn btn-primary">Submit</button>
      </div>
    )
  }
  
  render() {
    

      if (AuthState.isAuthenticated === false) {
        return <this.LoginForm />;
      }
      else { return <this.ControlPanel /> ;} 
  }
  
}

export default Admin;