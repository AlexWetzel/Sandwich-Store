import React from 'react';
import style from "./OrderNumber.module.css";

function OrderNumber(props) {
  return (
    <div className={`${style.submit} text-center`}>
      <h1 className="display-3 mb-5">Thank You!</h1>
      <div className={`${style.order_num_panel} shadow p-3`}>
        <h1>Your order number is:</h1>
        <h1 className={`${style.order_num} display-3`}>
          {"#" + props.orderNumber}
        </h1>
      </div>
    </div>
  )
}

export default OrderNumber;