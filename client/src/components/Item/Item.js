import React, { Component } from 'react';

class Item extends Component {

  // constructor() {
  //   super()
  // }

  render() {
    return (
      <div className="col-6">
        <div className="media bg-light m-3">
          <img
            src="https://cdn.winsightmedia.com/platform/files/public/800x1000/subway-footlong-roast-turkey-sub_0_0.jpg"
            alt="sandwich"
            style={{height: '100px'}}
            />
          <div>
            <h1>Sandwich</h1>
          </div>
        </div>
      </div>
    );
  }
};

export default Item;