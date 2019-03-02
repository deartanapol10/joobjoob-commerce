import axios from "axios";
import {
  GET_CATEGORY,
  CATEGORY_LOADING,
  CREATE_CATEGORY,
  GET_ERRORS,
  DELETE_CATEGORY,
  UPDATE_CATEGORY
} from "./types";

export const getCategory = () => dispatch => {
  dispatch(setLoading());
  axios.get(`/api/user/category`).then(res => {
    dispatch({
      type: GET_CATEGORY,
      payload: res.data
    });
  });
};

export const createCategory = payload => dispatch => {
  dispatch(setLoading());
  axios
    .post("/api/user/category", payload)
    .then(res => {
      dispatch({
        type: CREATE_CATEGORY,
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

export const deleteCategory = id => dispatch => {
  dispatch(setLoading());
  axios
    .delete(`/api/user/category/${id}`)
    .then(res => {
      dispatch({
        type: DELETE_CATEGORY,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        types: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const updateCategory = payload => dispatch => {
  dispatch(setLoading());
  axios
    .patch(`/api/user/category/${payload.main}`)
    .then(res => {
      dispatch({
        type: UPDATE_CATEGORY,
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
    type: CATEGORY_LOADING
  });
};
