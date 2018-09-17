import React, { Component } from 'react'

class ItemWrapper extends Component {

  render() {
    return (
      <div>
        <h1 className="m-3" style={{textAlign: 'center'}}>Sandwiches</h1>
        <div className="p-2">
          <div className="row">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

export { ItemWrapper };