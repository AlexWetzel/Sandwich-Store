import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import style from "./ItemWrapper.module.css";

function ItemWrapper(props) {
  return (
    <div>
      <h1 className="display-4 text-center">Sandwiches</h1>
      <div className="p-2">
        <div className="row">{props.children}</div>
        <div className="row">
          <div className="col-4">
            <Link to="/">
              <div className={`${style.cancel_btn} text-center mr-3 p-1`}>
                <h2 className="align-middle">Cancel Order</h2>
              </div>
            </Link>
          </div>
          <div className="col-8">
            <div
              className={
                `${style.submit_btn} text-center mr-3 p-1 ${props.buttonDisplay}`
              }
              onClick={props.checkout}
            >
              <h2 className="align-middle">Submit Order</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ItemWrapper.propTypes = {
  checkout: PropTypes.func
}

export { ItemWrapper };
