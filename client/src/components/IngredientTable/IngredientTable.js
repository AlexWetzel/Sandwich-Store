import React from 'react';
import { IngredientTableRow } from '../../components/IngredientTable';

const IngredientTable = (props) => {
  return (
    <div className="col-12">
      <h2>Inventory</h2>
      <div style={{height: '600px', overflowY: 'scroll'}}>
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
            <IngredientTableRow
              inventory={props.inventory}
              handleInventoryChange={props.handleInventoryChange}
              />
          </tbody>
        </table>
      </div>
      <InventoryButton allowSubmit={props.allowInvSubmit} submit={props.submit} />
    </div> 
  )
}

const InventoryButton = (props) => {
  return (
    (props.allowSubmit === true)
    ? <button onClick={props.submit} className="btn btn-primary btn-lg btn-block float-right">Submit</button>
    : <button type="button" className="btn btn-secondary btn-lg btn-block float-right" disabled>Submit</button>
  ); 
}

export { IngredientTable };