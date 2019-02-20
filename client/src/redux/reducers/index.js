import { GET_MENU_DATA } from "../types";

const initialState = {
  data: null,
  inventory: []
}

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MENU_DATA:
      return state;
    default:
      return state;
  }
}

export default rootReducer;