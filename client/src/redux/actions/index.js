import axios from "axios";
import { GET_MENU_DATA } from "../types";

export const getMenuData = () => dispatch => {
  axios
    .get("/api/menu")
    .then(res => {
      console.log("Menu Data:", res.data);
      return dispatch({ type: GET_MENU_DATA, payload: res.data });
    })
    .catch(err => console.log(err));
}