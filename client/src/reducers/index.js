import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import orderReducer from "./orderReducer";
import storeReducer from "./storeReducer";
import bankAccountReducer from "./bankAccountReducer";
import categoryReducer from "./categoryReducer";
import productReducer from "./productReducer";
import deliveryReducer from "./deliveryReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  order: orderReducer,
  store: storeReducer,
  bankAccount: bankAccountReducer,
  category: categoryReducer,
  product: productReducer,
  delivery: deliveryReducer
});
