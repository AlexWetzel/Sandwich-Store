import React, { Component } from 'react'

class IngredientWrapper extends Component {

  render() {
    return (
      <div className="col-8">
        <h1 classname="m-3" style={{textAlign: 'center'}}>Sandwiches</h1>
        <div className="p-2">
          <div className="row">
            {this.props.children}
          </div>
          <div className="row">
            <div className="col-12">
              <button>Back</button>
              <button>Next</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export { IngredientWrapper };