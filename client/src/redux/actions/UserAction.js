import axios from 'axios';
import * as action from '../constant/UserConstant.js';

const URL = 'http://localhost:8000/api/v1/user';

export const loginUser = (email, password) => async (dispatch) => {
  try {
    // console.log(email, password);
    dispatch({ type: action.User_LOGIN_REQUEST });

    const response = await axios.post(`${URL}/login`, { email, password });

    localStorage.setItem('userInfo', JSON.stringify(response.data.data));

    dispatch({ type: action.User_LOGIN_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: action.User_LOGIN_FAIL, payload: error.message });
  }
};

export const SignUpUser = (data) => async (dispatch) => {
  try {
    dispatch({ type: action.User_SIGNUP_REQUEST });
    const response = await axios.post(`${URL}/registerUser`, data);

    dispatch({ type: action.User_SIGNUP_SUCCESS, payload: response.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: action.User_SIGNUP_FAIL, payload: error.message });
  }
};

export const LogOutUser = () => async (dispatch) => {
  try {
    dispatch({ type: action.USER_LOGOUT_SUCCESS });
  } catch (error) {
    console.log(error);
  }
};
