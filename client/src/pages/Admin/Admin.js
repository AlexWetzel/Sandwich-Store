import React, { Component } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';

class Admin extends Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    username: '',
    pin: '',
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
      //redirect here

    }).catch( err => console.log(err));
  }

  
  render() {
    return (
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
}

export default Admin;