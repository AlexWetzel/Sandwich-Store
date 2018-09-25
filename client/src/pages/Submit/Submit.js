import React, { Component } from 'react';
import { Redirect } from 'react-router';


class Submit extends Component {

  state = {
    timeOver: false
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.setState({timeOver: true});
    }, 5000)
  }

  orderNumber = () => {
    return Math.floor(Math.random() * 100) + 1;
  }

  render() {
    if (this.state.timeOver === true) {
      return(<Redirect to='/' />);
    }

    return(
      <div id="Submit">
        <h1>Your order number is:</h1>
        <h1>{'#' + this.orderNumber()}</h1>
      </div>
    )
  }
}

export default Submit;