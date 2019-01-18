import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import style from './Start.module.css';

class Start extends Component {

  render() {
    return (
    <div>
      <Link to="/admin">
        <button type="button" className="btn btn-lg" style={{position:'fixed', top:'50px', right:'50px'}}>
          Associate login
        </button>
      </Link>
      <div className={`${style.start} row  m-0`}>
        <div className="col-12 text-center">
          <h1 className="display-1">Sandwich Store</h1>
          <Link to="/menu"><div className={`${style.start_btn} shadow-sm mt-3`}>Start</div></Link>
        </div>
      </div>
    </div>
    )
  }
}

export default Start;