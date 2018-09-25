import React, { Component } from 'react';

class Item extends Component {

  // constructor() {
  //   super()
  // }

  render() {
    return (
      <div className="col-6">
        <div
          className="media bg-light m-3"
          onClick={this.props.onClick}
        >
          <img
            src={this.props.imgSrc}
            alt="sandwich"
            style={{height: '100px'}}
            />
          <div>
            <h1>{this.props.name}</h1>
            <h3>{this.props.price}</h3>
          </div>
        </div>
      </div>
    );
  }
};

export { Item };