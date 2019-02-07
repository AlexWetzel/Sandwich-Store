import React from 'react';

const MenuLayout = props => {
  return (
    <div className="row justify-content-start">
      <div className="col-9">
        <div className="mx-auto pt-5" style={{ maxWidth: '1000px' }}>
          {props.menuSelection}
        </div>
      </div>

      {props.order}
    </div>
  )
}

export default MenuLayout;
