import {
  GET_STORE,
  STORE_LOADING,
  CREATE_STORE,
  DELETE_STORE,
  UPDATE_STORE
} from "../actions/types";

const initialState = {
  stores: [],
  store: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case STORE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_STORE:
      return {
        ...state,
        stores: action.payload,
        loading: false
      };
    case CREATE_STORE:
      return {
        ...state,
        store: action.payload,
        loading: false
      };
    case DELETE_STORE:
      return {
        ...state,
        store: action.payload,
        loading: false
      };
    case UPDATE_STORE:
      return {
        ...state,
        store: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
