import {
  GET_CATEGORY,
  CATEGORY_LOADING,
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  UPDATE_CATEGORY
} from "../actions/types";

const initialState = {
  loading: false,
  category: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CATEGORY_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_CATEGORY:
      return {
        ...state,
        category: action.payload,
        loading: false
      };
    case CREATE_CATEGORY:
      return {
        ...state,
        category: action.payload,
        loading: false
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        category: action.payload,
        loading: false
      };
    case UPDATE_CATEGORY:
      return {
        ...state,
        category: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
