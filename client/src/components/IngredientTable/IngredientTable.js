import React from "react";
import PropTypes from "prop-types";

function IngredientTable(props) {
  return (
    <div className="col-12">
      <h2>Inventory</h2>
      <div style={{ height: "600px", overflowY: "scroll" }}>
        <table className="table table-sm table-striped">
          <thead>
            <tr>
              <th scope="col">Ingredient</th>
              <th scope="col">Type</th>
              <th scope="col">Current Stock</th>
              <th scope="col">New Stock</th>
            </tr>
          </thead>
          <tbody>
            {props.children}
          </tbody>
        </table>
      </div>
      <InventoryButton
        allowSubmit={props.allowInvSubmit}
        submit={props.submit}
      />
    </div>
  );
};

function InventoryButton(props) {
  return props.allowSubmit === true ? (
    <button
      onClick={props.submit}
      className="btn btn-primary btn-lg btn-block float-right"
    >
      Submit
    </button>
  ) : (
    <button
      type="button"
      className="btn btn-secondary btn-lg btn-block float-right"
      disabled
    >
      Submit
    </button>
  );
};

IngredientTable.propTypes = {
  allowInvSubmit: PropTypes.bool,
  submit: PropTypes.func
}

export { IngredientTable };
