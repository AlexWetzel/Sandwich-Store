import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Start extends Component {

  render() {
    return (
      <div>
        <h1>Start screen</h1>
        <Link to="/menu"><button>Start</button></Link>
      </div>
    )
  }
}

export default Start;