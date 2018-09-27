import React, { Component } from 'react';
import './item.css'

class Item extends Component {

  // constructor() {
  //   super()
  // }

  render() {
    return (
      <div className="col-6">
        <div
          className="Item media m-3 shadow"
          onClick={this.props.onClick}
        >
          <img
            src={this.props.imgSrc}
            alt={this.props.name + " sandwich"}
            />
          <div className="media-body">
            <h1>{this.props.name}</h1>
            <h3>{"$" + this.props.price}</h3>
          </div>
        </div>
      </div>
    );
  }
};

export { Item };