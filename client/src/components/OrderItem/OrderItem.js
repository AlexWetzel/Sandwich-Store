import React from "react";
import "./orderItem.css";

function OrderItem(props) {
  return (
    <div className="Order-Item clearfix">
      <span className="delete-btn mr-2" onClick={props.delete}>
        <span className="oi oi-x" title="x" aria-hidden="true" />
      </span>

      <div className="order-item-info">
        <span className="name h5">
          <strong>{`${props.name} Sandwich`}</strong>
        </span>

        <span className="price h5">
          <strong>{`$${props.price}`}</strong>
        </span>

        <ul>{props.children}</ul>
      </div>
    </div>
  );
};

export { OrderItem };
