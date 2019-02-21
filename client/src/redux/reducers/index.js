import { GET_MENU_DATA, ADD_ITEM } from "../types";

const initialState = {
  data: null,
  inventory: [],
  order: [],
  total: 0,
  orderNumber: null
}

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MENU_DATA:
      return {
        ...state,
        data: action.payload,
        inventory: action.payload.ingredients
      };
    case ADD_ITEM:
      return {
        ...state,
        order: [ ...state.order, action.payload ]
      };
    default:
      return state;
  }
}

export default rootReducer;