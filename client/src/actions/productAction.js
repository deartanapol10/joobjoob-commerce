import axios from "axios";
import {
  GET_ALL_PRODUCT,
  GET_PRODUCT,
  ADD_PRODUCT,
  GET_ERRORS,
  PRODUCT_LOADING,
  EDIT_PRODUCT,
  DELETE_PRODUCT
} from "./types";

export const getAllProduct = () => dispatch => {
  dispatch(setLoading());
  axios
    .get("/api/product/")
    .then(res => {
      dispatch({
        type: GET_ALL_PRODUCT,
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

export const getProduct = (productId) => dispatch => {
  dispatch(setLoading());
  axios
    .get("/api/product/" + productId)
    .then(res => {
      dispatch({
        type: GET_PRODUCT,
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

export const createProduct = (newProduct) => dispatch => {
  dispatch(setLoading());
  axios
    .post("/api/product/", newProduct)
    .then(res => {
      dispatch({
        type: ADD_PRODUCT,
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

export const updateProduct = (productId,updatedProduct) => dispatch => {
  dispatch(setLoading());
  axios
    .put("/api/product/"+ productId, updatedProduct)
    .then(res => {
      dispatch({
        type: EDIT_PRODUCT,
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

export const deleteProduct = productId => dispatch => {
  dispatch(setLoading());
  axios
    .delete("/api/product/"+ productId)
    .then(res => {
      dispatch({
        type: DELETE_PRODUCT,
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
    type: PRODUCT_LOADING
  });
};
