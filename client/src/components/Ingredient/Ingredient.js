import React from "react";
import style from "./Ingredient.module.css";

const Ingredient = props => {
  return (
    <div className="col-4">
      <div
        className={`${style.panel} m-3 shadow text-center ${props.isInStock} ${props.isselected}`}
        onClick={props.onClick}
      >
        <img className={style.image} src={props.imgSrc} alt={props.name} />
        <h2>{props.name}</h2>
        <p>
          <b>Out of stock</b>
        </p>
      </div>
    </div>
  );
};

export { Ingredient };
