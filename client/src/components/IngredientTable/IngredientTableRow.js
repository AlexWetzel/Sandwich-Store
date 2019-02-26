import React from "react";

function IngredientTableRow(props) {
  return (
    <>
      {/* {props.inventory.map((ingredient) => {
        return ( */}
          <tr key={props.name}>
            <th scope="row">{props.name}</th>
            <td>{props.type}</td>
            <td>{props.stock}</td>
            <td>
              <form onSubmit={e => e.preventDefault()}>
                <input
                  className="form-control form-control-sm"
                  name={props.name}
                  value={props.newStock}
                  type="number"
                  min="0"
                  max="999"
                  onChange={props.handleInventoryChange}
                  style={{ width: "70px" }}
                />
              </form>
            </td>
          </tr>
        {/* );
      })} */}
    </>
  );
};

export { IngredientTableRow };
