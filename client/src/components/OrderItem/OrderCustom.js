import React from 'react';
import PropTypes from "prop-types";

function OrderCustom(props) {
  return(
    <li>
      {props.name}
    </li>
  )
}

OrderCustom.propTypes = {
  name: PropTypes.string
}

export { OrderCustom };