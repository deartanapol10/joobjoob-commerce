import axios from "axios";
import {
  GET_STORE,
  STORE_LOADING,
  CREATE_STORE,
  GET_ERRORS,
  DELETE_STORE,
  UPDATE_STORE
} from "./types";

export const getAllStore = () => dispatch => {
  dispatch(setLoading());
  axios
    .get("/api/store")
    .then(res => {
      dispatch({
        type: GET_STORE,
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

export const createStore = payload => dispatch => {
  dispatch(setLoading());
  axios
    .post("/api/store", payload)
    .then(res => {
      dispatch({
        type: CREATE_STORE,
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

export const deleteStore = storeId => dispatch => {
  dispatch(setLoading());
  axios
    .delete(`/api/store/${storeId}`)
    .then(res => {
      dispatch({
        type: DELETE_STORE,
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

export const updateStore = (storeId, payload) => dispatch => {
  dispatch(setLoading());
  axios
    .patch(`/api/store/${storeId}`, payload)
    .then(res => {
      dispatch({
        type: UPDATE_STORE,
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
    type: STORE_LOADING
  });
};
