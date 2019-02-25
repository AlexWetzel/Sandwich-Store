import axios from "axios";
import {
  RESET_ORDER,
  GET_MENU_DATA,
  SEND_INVENTORY_UPDATE,
  SEND_ORDER_DATA,
  ADD_ITEM,
  REMOVE_ITEM,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT
} from "../types";

export const resetOrder = () => dispatch => {
  return dispatch({ type: RESET_ORDER });
};

export const getMenuData = () => dispatch => {
  axios
    .get("/api/menu")
    .then(res => {
      console.log("Menu Data:", res.data);
      return dispatch({ type: GET_MENU_DATA, payload: res.data });
    })
    .catch(err => {
      console.log(err);
      // Dispatch error handler
      // return dispatch({ type: DISPLAY_ERROR, payload: err});
    });
};

export const sendOrderData = data => dispatch => {
  axios
    .post("/api/order", data)
    .then(res => {
      console.log(res);
      return dispatch({ type: SEND_ORDER_DATA, payload: res.data.orderNumber });
    })
    .catch(err => {
      console.log(err);
      // Dispatch error handler
      // return dispatch({ type: DISPLAY_ERROR, payload: err});
    });
};

export const sendInventoryUpdate = data => dispatch => {
  axios
    .post("/api/inventory", {
      inventory: data
    })
    .then(res => {
      console.log(res.data.message);
      // if (res.status === 200) {
      //   this.props.getMenuData(function() {
      //     console.log("Data update complete");
      //   });
      // }
      return dispatch({ type: SEND_INVENTORY_UPDATE });
    })
    .catch(err => console.log(err));
}

// Needs a stock check before this is invoked
export const addItem = sandwich => dispatch => {
  const newSandwich = { ...sandwich, ingredients: [] };
  return dispatch({ type: ADD_ITEM, payload: newSandwich });
};

export const removeItem = index => dispatch => {
  return dispatch({ type: REMOVE_ITEM, payload: index });
};

export const addIngredient = ingredient => dispatch => {
  return dispatch({ type: ADD_INGREDIENT, payload: ingredient });
};

export const removeIngredient = index => dispatch => {
  return dispatch({ type: REMOVE_INGREDIENT, payload: index });
};
