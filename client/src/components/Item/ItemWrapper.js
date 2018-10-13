import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './itemWrapper.css';

class ItemWrapper extends Component {

  render() {
    return (
      <div>
        <h1 className="m-3 display-4 text-center">Sandwiches</h1>
        <div className="p-2">
          <div className="row">
            {this.props.children}
          </div>
          <div className={"row " + this.props.buttonDisplay}>
            <div className="col-4">
              <Link to="/">
                <div id="cancel-btn" className="text-center ml-3 mt-5 p-1">
                  <h2 className="align-middle">Cancel Order</h2>
                </div>
              </Link>
            </div>
            <div className="col-8">
              <div id="submit-btn" className="text-center mr-3 mt-5 p-1" onClick={this.props.onClick}>
                <h2 className="align-middle">Submit Order</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export { ItemWrapper };