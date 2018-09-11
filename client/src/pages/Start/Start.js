import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Start extends Component {

  render() {
    return (
      <div>
        <h1>Start screen</h1>
        <button><Link to="/menu">Start</Link></button>
      </div>
    )
  }
}

export default Start;