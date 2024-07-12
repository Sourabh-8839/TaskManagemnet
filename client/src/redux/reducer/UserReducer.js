import * as actionTypes from '../constant/UserConstant.js';

export const LoginReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.User_LOGIN_REQUEST:
      return { loading: 'true' };

    case actionTypes.User_LOGIN_SUCCESS:
      return { loading: 'false', user: action.payload };

    case actionTypes.User_LOGIN_FAIL:
      return { loading: 'false', error: action.payload };

    default:
      return state;
  }
};

export const SignInReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.User_SIGNIN_REQUEST:
      return { loading: 'true' };

    case actionTypes.User_SIGNIN_SUCCESS:
      return { loading: 'false', user: action.payload };

    case actionTypes.User_LOGIN_FAIL:
      return { loading: 'false', error: action.payload };

    default:
      return state;
  }
};
