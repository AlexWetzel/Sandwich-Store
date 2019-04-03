import React from "react";
import PropTypes from "prop-types";
import style from "./Ingredient.module.css";

function Ingredient(props) {
  const stockStyle = props.stock > 0 ? "" : style.outOfStock;
  const selectStyle = props.isSelected ? style.selected : "";
  return (
    <div className="col-4">
      <div
        className={`m-3 shadow text-center ${stockStyle} ${selectStyle} ${style.panel}`}
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
}

Ingredient.propTypes = {
  name: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  stock: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
}

export { Ingredient };
