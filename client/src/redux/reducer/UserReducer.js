import * as actionTypes from '../constant/UserConstant.js';

export const LoginReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.User_LOGIN_REQUEST:
      return { loading: true };

    case actionTypes.User_LOGIN_SUCCESS:
      return { loading: false, user: action.payload };

    case actionTypes.User_LOGIN_FAIL:
      return { loading: false, error: action.payload };

    case actionTypes.USER_LOGOUT_SUCCESS:
      return { ...state, user: null, error: null };

    default:
      return state;
  }
};

export const SignUpReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.User_SIGNUP_REQUEST:
      return { loading: 'true' };

    case actionTypes.User_SIGNUP_SUCCESS:
      return { loading: 'false', user: action.payload };

    case actionTypes.User_SIGNUP_FAIL:
      return { loading: 'false', error: action.payload };

    default:
      return state;
  }
};
