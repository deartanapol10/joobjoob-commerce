import {
  GET_BANKACCOUNT,
  BANKACCOUNT_LOADING,
  CREATE_BANKACCOUNT,
  UPDATE_BANKACCOUNT,
  DELETE_BANKACCOUNT
} from "../actions/types";

const initialState = {
  loading: false,
  bankAccount: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case BANKACCOUNT_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_BANKACCOUNT:
      return {
        ...state,
        bankAccount: action.payload,
        loading: false
      };
    case CREATE_BANKACCOUNT:
      return {
        ...state,
        bankAccount: action.payload,
        loading: false
      };
    case DELETE_BANKACCOUNT:
      return {
        ...state,
        bankAccount: action.payload,
        loading: false
      };
    case UPDATE_BANKACCOUNT:
      return {
        ...state,
        bankAccount: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
