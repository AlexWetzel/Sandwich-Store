import React from "react";
import PropTypes from "prop-types";
import style from "./Item.module.css";

function Item(props) {
  return (
    <div className="col-6">
      <div
        className={`media m-2 shadow
          ${style.name}
          ${props.isInStock ? "" : style.outOfStock}`}
        onClick={() => {
          props.addOrderItem();
          props.nextPage();
        }}
      >
        <img
          className={style.image}
          src={props.imgSrc}
          alt={props.name + " sandwich"}
        />
        <div className="media-body">
          <h1>{props.name}</h1>
          <h3>{"$" + props.price}</h3>
        </div>
      </div>
    </div>
  );
}

Item.propTypes = {
  isInStock: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  imgSrc: PropTypes.string.isRequired
}

export { Item };
