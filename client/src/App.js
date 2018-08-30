import React, { Component } from 'react';
import Item from './components/Item';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-8">
          <h1 classname="m-3" style={{textAlign: 'center'}}>Sandwiches</h1>
          <div className="p-2">
            <div className="row">

              <Item />
              
            </div>
          </div>
        </div>
        <div className="col-4" >
          <div className="jumbotron" style={{height: '900px', lineSpacing: 1}}>
            <p>Ham Sandwich $5.98</p>            
            <ul style={{listStyleType: 'none'}}>
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
