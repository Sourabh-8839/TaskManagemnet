import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';

import { thunk } from 'redux-thunk';
import {
  addTaskReducer,
  getAllTaskReducer,
  getTaskByIDReducer,
  getTaskQueyByReducer,
  getTaskReducer,
  getUserTaskReducer,
  updateTaskReducer,
} from './reducer/taskReducer';
import { LoginReducer, SignUpReducer } from './reducer/UserReducer';

const reducer = combineReducers({
  addTask: addTaskReducer,
  getTask: getTaskReducer,
  getUserTask: getUserTaskReducer,
  getAllTask: getAllTaskReducer,
  getTaskByID: getTaskByIDReducer,
  updateTask: updateTaskReducer,
  SignUp: SignUpReducer,
  Login: LoginReducer,
  getTaskByQuery: getTaskQueyByReducer,
});

const middleware = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
