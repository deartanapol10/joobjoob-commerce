import {
   GET_PROFILE,
   GET_PROFILES,
   PROFILE_LOADING,
   CLEAR_CURRENT_PROFILE,
   GET_ORDER,
   ORDER_LOADING
} from "../actions/types";

const initialState = {
   order: null,
   profile: null,
   profiles: null,
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
      case ORDER_LOADING:
         return {
            ...state,
            loading: true
         };
      case PROFILE_LOADING:
         return {
            ...state,
            loading: true
         };
      case GET_PROFILE:
         return {
            ...state,
            profile: action.payload,
            loading: false
         };
      case GET_PROFILES:
         return {
            ...state,
            profiles: action.payload,
            loading: false
         };
      case CLEAR_CURRENT_PROFILE:
         return {
            ...state,
            profile: null
         };
      default:
         return state;
   }
}
