import {
  GET_ORDER,
  LOADING,
  CHANGE_ORDER_STATUS,
  CREATE_ORDER,
  GET_ALL_ORDERS
} from "../actions/types";

const initialState = {
  order: [],
  orders: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ORDER:
      return {
        ...state,
        order: action.payload,
        loading: false
      };
    case LOADING:
      return {
        ...state,
        loading: true
      };
    case CHANGE_ORDER_STATUS:
      return {
        ...state,
        orders: action.payload,
        loading: false
      };
    case CREATE_ORDER:
      return {
        ...state,
        order: action.payload,
        loading: false
      };
    case GET_ALL_ORDERS:
      return {
        ...state,
        orders : action.payload,
        loading: false
      };
    default:
      return state;
  }
}