import React from "react";

function ControlPanel(props) {
  return (
    <div className="container">
      <div className="row block pt-3 pb-3">
        <div className="col-12">
          <h3 className="float-left">Control Panel</h3>
          <button
            onClick={props.logOut}
            className="btn btn-primary float-right"
          >
            Log Out
          </button>
        </div>
      </div>

      <div className="row">
        {props.children}
      </div>
    </div>
  );
};

export default ControlPanel;
