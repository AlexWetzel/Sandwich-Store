import axios from "axios";
import { GET_MENU_DATA, ADD_ITEM, REMOVE_ITEM } from "../types";

export const getMenuData = () => dispatch => {
  axios
    .get("/api/menu")
    .then(res => {
      console.log("Menu Data:", res.data);
      return dispatch({ type: GET_MENU_DATA, payload: res.data });
    })
    .catch(err => 
      console.log(err)
      // Dispatch error handler
      // return dispatch({ type: DISPLAY_ERROR, payload: err})
      );
}

// Needs a stock check before this is invoked
export const addItem = (sandwich) => dispatch => {
  const newSandwich = {...sandwich, ingredients: []}

  return dispatch({ type: ADD_ITEM, payload: newSandwich })
}

export const removeItem = (index) => dispatch => {
  return dispatch({ type: REMOVE_ITEM, payload: index })
}