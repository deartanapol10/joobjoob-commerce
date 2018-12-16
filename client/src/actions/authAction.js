import axios from "axios";
import { LOGIN, SET_USER_LOADING } from "./types";

export const login = payload => dispatch => {
  dispatch(setLoading());
  axios
    .post("/api/users/login", payload)
    .then(res => {
      dispatch({
        type: LOGIN,
        payload: res.data
      });
    })
    .catch(err => {
      throw err;
    });
};

export const setLoading = () => dispatch => {
  dispatch({
    type: SET_USER_LOADING
  });
};
