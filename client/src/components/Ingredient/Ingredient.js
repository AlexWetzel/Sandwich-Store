import React, { Component } from 'react';

class Ingredient extends Component {

  render() {
    return (
      <div className="col-6">
        <div
          className="media bg-light m-3"
          onClick={this.props.onClick}
        >
          <img
            src={this.props.imgSrc}
            alt="Lettuce"
            style={{height: '100px'}}
            />
          <div>
            <h1>{this.props.name}</h1>
            <p>{this.props.isselected}</p>
          </div>
        </div>
      </div>
    );
  }
}

export { Ingredient };