import axios from "axios";
import {
  GET_DELIVERY,
  CREATE_DELIVERY,
  DELETE_DELIVERY,
  UPDATE_DELIVERY,
  GET_ERRORS,
  DELIVERY_LOADING
} from "./types";

export const getDelivery = () => dispatch => {
  dispatch(setLoading());
  axios
    .get(`/api/user/delivery`)
    .then(res => {
      dispatch({
        type: GET_DELIVERY,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const createDelivery = payload => dispatch => {
  dispatch(setLoading());
  axios
    .post("/api/user/delivery", payload)
    .then(res => {
      dispatch({
        type: CREATE_DELIVERY,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payloaf: err.response.data
      });
    });
};

export const deleteDelivery = deliveryName => dispatch => {
  dispatch(setLoading());
  axios
    .delete(`/api/user/delivery/${deliveryName}`)
    .then(res => {
      dispatch({
        type: DELETE_DELIVERY,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const updateDelivery = payload => dispatch => {
  dispatch(setLoading());
  axios
    .patch(`/api/user/delivery/${payload.deliveryName || ""}`, payload)
    .then(res => {
      dispatch({
        type: UPDATE_DELIVERY,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const setLoading = () => dispatch => {
  dispatch({
    type: DELIVERY_LOADING
  });
};
