import {
  RESET_ORDER,
  GET_MENU_DATA,
  SEND_ORDER_DATA,
  SEND_INVENTORY_UPDATE,
  ADD_ITEM,
  REMOVE_ITEM,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  REMOVE_FROM_STOCK
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
      return {
        ...state,
        data: {
          ...state.sandwiches,
          ingredients: action.payload
        },
        inventory: action.payload
      };

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
    case REMOVE_FROM_STOCK:
      size = state.order.length - 1;
      let newInventory = state.inventory.map(ingredient => {
        return {...ingredient};
      });
      const sandwich = state.order[size];      
      // Remove sandwich meats from stock
      sandwich.meat.forEach( meat => {
        const newStock = newInventory.find(ingredient => 
          ingredient.name === meat.name          
        );
        newStock.stock -= meat.quantity;
      });
      // Remove sandwich toppings from stock
      sandwich.ingredients.forEach(ingredient => {
        const newStock = newInventory.find(invIngred => 
          invIngred.name === ingredient          
        );
        newStock.stock -= 1;
      });
      return {
        ...state,
        inventory: newInventory
      };
    case ADD_BACK_STOCK:
      size = state.order.length - 1;
      let newInventory = state.inventory.map(ingredient => {
        return {...ingredient};
      });
      const sandwich = state.order[size];      
      // Remove sandwich meats from stock
      sandwich.meat.forEach( meat => {
        const newStock = newInventory.find(ingredient => 
          ingredient.name === meat.name          
        );
        newStock.stock -= meat.quantity;
      });
      // Remove sandwich toppings from stock
      sandwich.ingredients.forEach(ingredient => {
        const newStock = newInventory.find(invIngred => 
          invIngred.name === ingredient          
        );
        newStock.stock -= 1;
      });
      return {
        ...state,
        inventory: newInventory
      };
    default:
      return state;
  }
}

export default rootReducer;
