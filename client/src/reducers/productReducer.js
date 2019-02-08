import {
  GET_ALL_PRODUCT,
  PRODUCT_LOADING,
  ADD_PRODUCT,
  DELETE_PRODUCT,
  EDIT_PRODUCT
} from "../actions/types";

const initialState = {
  loading: false,
  product: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PRODUCT_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_ALL_PRODUCT:
      return {
        ...state,
        product: action.payload,
        loading: false
      };
    case ADD_PRODUCT:
      return {
        ...state,
        product: action.payload,
        loading: false
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        product: action.payload,
        loading: false
      };
    case EDIT_PRODUCT:
      return {
        ...state,
        product: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
