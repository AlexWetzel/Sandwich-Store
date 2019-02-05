import React from 'react';
import style from "../../pages/Menu/Menu.module.css";

function MenuLayout(props) {
  return (
    <div className="row justify-content-start">
      <div className="col-9">
        <div className={style.menu_container}>
          {props.menuSelection}
        </div>
      </div>

      {props.order}
    </div>
  )
}

export default MenuLayout;
