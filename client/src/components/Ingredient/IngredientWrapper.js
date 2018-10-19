import React, { Component } from 'react';
import style from './IngredientWrapper.module.css';

class IngredientWrapper extends Component {

  render() {
    return (
      <div>
        <h1 className="m-3 text-center display-4">Choose Your Ingredients</h1>
        <div className="p-2">
          <div className="row">
            {this.props.children}
          </div>
        </div>
        <div className="row">
          <div className="col-3 offset-3">
            <div className={`${style.menu_btn} shadow-sm`} onClick={this.props.previous}>Back</div>
          </div>            
          <div className="col-3">
            <div className={`${style.menu_btn} shadow-sm`} onClick={this.props.next}>Next</div>
          </div>          
        </div>
      </div>
    )
  }
}

export { IngredientWrapper };