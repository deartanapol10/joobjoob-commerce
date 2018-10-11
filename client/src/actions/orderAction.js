import axios from "axios";
import { GET_ORDER, ORDER_LOADING } from "./types";

export const getOrder = (userid, orderid) => dispatch => {
  dispatch(setOrderLoading());
  axios
    .get("/api/orders/" + userid + "/" + orderid)
    .then(res => {
      dispatch({
        type: GET_ORDER,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ORDER,
        payload: {}
      })
    );
};

// Profile loading
export const setOrderLoading = () => {
  return {
    type: ORDER_LOADING
  };
};
