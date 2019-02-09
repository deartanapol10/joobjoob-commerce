import {
  GET_DELIVERY,
  DELIVERY_LOADING,
  CREATE_DELIVERY,
  UPDATE_DELIVERY,
  DELETE_DELIVERY
} from "../actions/types";

const initialState = {
  loading: false,
  delivery: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case DELIVERY_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_DELIVERY:
      return {
        ...state,
        delivery: action.payload,
        loading: false
      };
    case CREATE_DELIVERY:
      return {
        ...state,
        delivery: action.payload,
        loading: false
      };
    case DELETE_DELIVERY:
      return {
        ...state,
        delivery: action.payload,
        loading: false
      };
    case UPDATE_DELIVERY:
      return {
        ...state,
        delivery: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
