import { GET_MENU_DATA, ADD_ITEM, REMOVE_ITEM, ADD_INGREDIENT, REMOVE_INGREDIENT } from "../types";

const initialState = {
  data: null,
  inventory: [],
  order: [],
  orderNumber: null
}

function rootReducer(state = initialState, action) {
  let newOrder;
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
      newOrder = [...state.order];
      newOrder.splice(action.index, 1);
      return {
        ...state,
        order: newOrder
      };
    case ADD_INGREDIENT:
      const size = state.order.length - 1;
      return {
        ...state,
        order: state.order.map((orderItem, index) => {
          if(index !== size) {
            return orderItem;
          }
          return {
            ...state.order[index],
            ingredients: [
              ...state.order[size].ingredients,
              action.payload
            ]
          };
        })
      };
    default:
      return state;
  }
}

export default rootReducer;