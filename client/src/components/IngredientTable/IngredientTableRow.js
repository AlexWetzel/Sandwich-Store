import React from "react";

function IngredientTableRow(props) {
  return (
    <>
      {props.inventory.map((ingredient) => {
        return (
          <tr key={ingredient.name}>
            <th scope="row">{ingredient.name}</th>
            <td>{ingredient.type}</td>
            <td>{ingredient.stock}</td>
            <td>
              <form onSubmit={e => e.preventDefault()}>
                <input
                  className="form-control form-control-sm"
                  name={ingredient.name}
                  value={ingredient.newStock}
                  type="number"
                  min="0"
                  max="999"
                  onChange={props.handleInventoryChange}
                  style={{ width: "70px" }}
                />
              </form>
            </td>
          </tr>
        );
      })}
    </>
  );
};

export { IngredientTableRow };
