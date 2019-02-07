import React, { Component } from 'react';

class MenuLayout extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render(){
    return (
      <div className="row justify-content-start">
        <div className="col-9">
          <div className="mx-auto pt-5" style={{ maxWidth: '1000px' }}>
            {this.props.menuSelection}
          </div>
        </div>
  
        {this.props.order}
      </div>
    )
  }
}

export default MenuLayout;
