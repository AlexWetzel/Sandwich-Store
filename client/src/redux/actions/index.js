import axios from "axios";
import {
  RESET_ORDER,
  GET_MENU_DATA,
  SEND_INVENTORY_UPDATE,
  SEND_ORDER_DATA,
  ADD_ITEM,
  REMOVE_ITEM,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  REMOVE_FROM_STOCK,
  ADD_BACK_STOCK,
  HANDLE_ERROR,
  SET_MENU_STATE
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
      return dispatch({ type: HANDLE_ERROR, payload: err});
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
      return dispatch({ type: HANDLE_ERROR, payload: err});
    });
};

export const sendInventoryUpdate = data => dispatch => {
  axios
    .post("/api/inventory", {
      inventory: data
    })
    .then(res => {
      return dispatch({ type: SEND_INVENTORY_UPDATE, payload: res.data.inventory });
    })
    .catch(err => {
      console.log(err);
      return dispatch({ type: HANDLE_ERROR, payload: err});
    });
}

// Needs a stock check before this is invoked
export const addItem = sandwich => dispatch => {
  const newSandwich = { ...sandwich, ingredients: [] };
  return dispatch({ type: ADD_ITEM, payload: newSandwich });
};

export const removeItem = (sandwich, index, orderSize)=> dispatch => {
  // This next action needs to check the index, 
  console.log("index:",index);
  console.log("size:",orderSize);
  if(index < orderSize) {
    dispatch({ type: ADD_BACK_STOCK, payload: sandwich });
  }
  dispatch({ type: REMOVE_ITEM, payload: index });
};

export const addIngredient = ingredient => dispatch => {
  return dispatch({ type: ADD_INGREDIENT, payload: ingredient });
};

export const removeIngredient = index => dispatch => {
  return dispatch({ type: REMOVE_INGREDIENT, payload: index });
};

export const removeFromStock = () => dispatch => {
  return dispatch({ type: REMOVE_FROM_STOCK });
};

export const setMenuState = nextPage => dispatch => {
  return dispatch({ type: SET_MENU_STATE, payload: nextPage });
}