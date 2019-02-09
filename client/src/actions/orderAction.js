import axios from "axios";
import {
  GET_ORDER,
  LOADING,
  CHANGE_ORDER_STATUS,
  CHANGE_ORDER,
  CREATE_ORDER,
  GET_ALL_ORDERS,
  UPLOADS_SLIP,
  DELETE_ORDER
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
    .get("/api/orders/", header)
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
export const getOrder = (orderid) => dispatch => {
  dispatch(setOrderLoading());
  axios
    .get("/api/orders/" + orderid)
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
export const changeOrderStatus = (statusWord,allIds) => dispatch => {
  dispatch(setOrderLoading());
  axios
    .put("/api/orders/status/"+ statusWord,allIds
    )
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

// Change order
export const changeOrder = (changeId) => dispatch => {
  dispatch(setOrderLoading());
  axios
    .put("/api/orders/"+ changeId
    )
    .then(res => {
      dispatch({
        type: CHANGE_ORDER,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: CHANGE_ORDER,
        payload: {}
      });
    });
};

// Uploads slip 
export const uploadSlip = (id,imgSlip) => dispatch => {
  dispatch(setOrderLoading());
  axios
    .put("/api/orders/upload/slip/"+ id,imgSlip
    )
    .then(res => {
      dispatch({
        type: UPLOADS_SLIP,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: UPLOADS_SLIP,
        payload: {}
      });
    });
};

// Create order
export const createOrder = (new_order) => dispatch => {
  dispatch(setOrderLoading());
  axios
    .post("/api/orders/" ,new_order)
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

//Delete Order
export const delOrder = (delId) => dispatch => {
  dispatch(setOrderLoading());
  axios
    .delete("/api/orders/" + delId)
    .then(res => {
      dispatch({
        type: DELETE_ORDER,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: DELETE_ORDER,
        payload: {}
      });
    });
};
