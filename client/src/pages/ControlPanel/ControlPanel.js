import React, { Component } from 'react';
import axios from 'axios';
// import { Redirect } from 'react-router';


class ControlPanel extends Component {
  constructor(props) {
    super(props);

    this.logOut = this.logOut.bind(this);
  }

  logOut = (event) => {
    
    event.preventDefault();

    axios.post('/user/logout')
      .then( res => {
        console.log('Logged out')
        console.log(res)
      }).catch( err => console.log(err));
  }

  render() {
    return(
      <button onClick={this.logOut} className="btn btn-primary">Submit</button>
    )
  }
}

export default ControlPanel;