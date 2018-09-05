import React, { Component } from 'react'

class IngredientWrapper extends Component {
  
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div className="col-8">
        <h1 className="m-3" style={{textAlign: 'center'}}>Choose Your Ingredients</h1>
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