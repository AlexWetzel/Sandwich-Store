import React from 'react'

const ControlPanel = (props) => {
  return (
    <div className="container">
      <div className="row block pt-3 pb-3">
        <div className="col-12">
          <h3 className="float-left">Control Panel</h3>
          <button onClick={props.logOut} className="btn btn-primary float-right">Log Out</button>
        </div>
      </div>

      <div className="row">
        {/* <div className="col-3">
        </div> */}
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
                {props.inventory.map((ingredient, index) => {
                  return(
                    <tr key={ingredient.name}>
                      <th scope="row">{ingredient.name}</th>
                      <td>{ingredient.type}</td>
                      <td>{ingredient.stock}</td>
                      <td>
                        <form onSubmit={e => { e.preventDefault(); }} >
                          <input 
                            className="form-control form-control-sm" 
                            name={ingredient.name}
                            value={ingredient.newStock}
                            type="number"
                            min="0"
                            max="999"
                            onChange={props.handleInventoryChange}
                            style={{ width: '70px'}}
                          />
                        </form>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {/* <this.InventoryButton /> */}
        </div>  
      </div>
    </div>
  )
}

export default ControlPanel