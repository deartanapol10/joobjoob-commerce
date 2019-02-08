import { SET_CURRENT_USER } from "../actions/types";

const initialState = {
  user: {},
  isAuthenticated: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true
      };
    default:
      return state;
  }
}
