import axios from "axios";
import {
  GET_BANKACCOUNT,
  BANKACCOUNT_LOADING,
  UPDATE_BANKACCOUNT,
  DELETE_BANKACCOUNT,
  CREATE_BANKACCOUNT,
  GET_ERRORS
} from "./types";

export const getBankAccount = () => dispatch => {
  dispatch(setLoading());
  axios
    .get("/api/user/bankAccount")
    .then(res => {
      dispatch({
        type: GET_BANKACCOUNT,
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

export const createBankAccount = payload => dispatch => {
  dispatch(setLoading());
  axios
    .post("/api/user/bankAccount", payload)
    .then(res => {
      dispatch({
        type: CREATE_BANKACCOUNT,
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

export const deleteBankAccount = accountNumber => dispatch => {
  dispatch(setLoading());
  axios
    .delete(`/api/user/bankAccount/${accountNumber}`)
    .then(res => {
      dispatch({
        type: DELETE_BANKACCOUNT,
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

export const updateBankAccount = payload => dispatch => {
  dispatch(setLoading());
  axios
    .patch(`/api/user/bankAccount/${payload.accountNumber || ""}`, payload)
    .then(res => {
      dispatch({
        type: UPDATE_BANKACCOUNT,
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
    type: BANKACCOUNT_LOADING
  });
};
