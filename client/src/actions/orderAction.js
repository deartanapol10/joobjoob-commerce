import axios from "axios";
import {
  GET_ORDER,
  LOADING,
  CHANGE_ORDER_STATUS,
  CREATE_ORDER,
  GET_ALL_ORDERS
} from "./types";

// GET all orders
export const getAllOrders = token => dispatch => {
  const header = {
    headers: {
      Authorization: token
    }
  };
  dispatch(setOrderLoading());
  axios
    .get("/api/orders", header)
    .then(res => {
      dispatch({
        type: GET_ALL_ORDERS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ALL_ORDERS,
        payload: {}
      });
    });
};

// Get a order
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
    type: LOADING
  };
};

// Change order status
export const changeOrderStatus = (userId, orderId, status) => dispatch => {
  dispatch(setOrderLoading());
  axios
    .patch("/api/orders/" + userId + "/" + orderId, status)
    .then(res => {
      dispatch({
        type: CHANGE_ORDER_STATUS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: CHANGE_ORDER_STATUS,
        payload: {}
      });
    });
};

// Create order
export const createOrder = (userId, order) => dispatch => {
  dispatch(setOrderLoading());
  axios
    .post("/api/orders/" + userId, order)
    .then(res => {
      dispatch({
        type: CREATE_ORDER,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: CREATE_ORDER,
        payload: {}
      });
    });
};
