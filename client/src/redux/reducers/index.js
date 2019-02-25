import {
  RESET_ORDER,
  GET_MENU_DATA,
  SEND_ORDER_DATA,
  SEND_INVENTORY_UPDATE,
  ADD_ITEM,
  REMOVE_ITEM,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT
} from "../types";

const initialState = {
  data: null,
  inventory: [],
  order: [],
  orderNumber: null
};

function rootReducer(state = initialState, action) {
  let newOrder;
  // For add/remove ingredient
  let size;
  switch (action.type) {
    case RESET_ORDER:
      return {
        ...state,
        order: [],
        orderNumber: null
      };

    case GET_MENU_DATA:
      return {
        ...state,
        data: action.payload,
        inventory: action.payload.ingredients
      };
    case SEND_ORDER_DATA:
      return {
        ...state,
        orderNumber: action.payload
      };
    case SEND_INVENTORY_UPDATE:
      return state;

    case ADD_ITEM:
      return {
        ...state,
        order: [...state.order, action.payload]
      };
    case REMOVE_ITEM:
      newOrder = [...state.order];
      newOrder.splice(action.index, 1);
      return {
        ...state,
        order: newOrder
      };
    case ADD_INGREDIENT:
      size = state.order.length - 1;
      return {
        ...state,
        order: state.order.map((orderItem, index) => {
          if (index !== size) {
            return orderItem;
          }
          return {
            ...state.order[index],
            ingredients: [...state.order[size].ingredients, action.payload]
          };
        })
      };
    case REMOVE_INGREDIENT:
      size = state.order.length - 1;
      const newIngredients = [...state.order[size].ingredients];
      newIngredients.splice(action.payload, 1);
      return {
        ...state,
        order: state.order.map((orderItem, index) => {
          if (index !== size) {
            return orderItem;
          }
          return {
            ...state.order[index],
            ingredients: newIngredients
          };
        })
      };
    default:
      return state;
  }
}

export default rootReducer;
