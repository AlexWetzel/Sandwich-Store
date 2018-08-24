import React, { Component } from 'react';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-8">
          <h1 classname="m-3" style={{textAlign: 'center'}}>Sandwiches</h1>
          <div className="p-2">
            <div className="row">

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
              
            </div>
          </div>
        </div>
        <div className="col-4" >
          <div className="jumbotron" style={{height: '900px', lineSpacing: 1}}>
            <p>Ham Sandwich $5.98</p>            
            <ul style={{listStyleType: 'none'}}>
              <li>Ham sandwich</li>
              <li>Mayo</li>
              <li>Swiss</li>
              <li>Lettuce</li>
              <li>Tomato</li>
            </ul>

          </div>
        </div>
      </div>
    );
  }
}

export default App;
