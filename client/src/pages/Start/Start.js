import React, { Component } from "react";
import { Link } from "react-router-dom";
import style from "./Start.module.css";
import { connect } from "react-redux";
import { resetOrder } from "../../redux/actions";

class Start extends Component {
  componentDidMount() {
    this.props.resetOrder();
  }

  render() {
    return (
      <div>
        <Link to="/admin">
          <button type="button" className="btn btn-lg float-right m-4">
            Associate login
          </button>
        </Link>
        <div className={`${style.start} row  m-0`}>
          <div className="col-12 text-center">
            <h1 className="display-1">Sandwich Store</h1>
            <Link to="/menu">
              <div className={`${style.start_btn} shadow-sm mt-3`}>Start</div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { resetOrder })(Start);
