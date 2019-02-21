import { GET_MENU_DATA, ADD_ITEM, REMOVE_ITEM } from "../types";

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
    case REMOVE_ITEM:
      let newOrder = [...state.order];
      newOrder.splice(action.index, 1);
      return {
        ...state,
        order: newOrder
      };
    default:
      return state;
  }
}

export default rootReducer;