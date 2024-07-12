import * as actionTypes from '../constant/taskConstant.js';

export const addTaskReducer = (state = { addTask: [] }, action) => {
  switch (action.type) {
    case actionTypes.ADD_TASK_REQUEST:
      return { loading: 'true' };

    case actionTypes.ADD_TASK_SUCCESS:
      return { loading: 'false', tasks: action.payload };

    case actionTypes.ADD_TASK_FAIL:
      return { loading: 'false', error: action.payload };

    default:
      return state;
  }
};

export const getTaskReducer = (state = { getTasks: [] }, action) => {
  switch (action.type) {
    case actionTypes.GET_TASK_REQUEST:
      return { loading: 'true' };

    case actionTypes.GET_TASK_SUCCESS:
      return { loading: 'false', tasks: action.payload };

    case actionTypes.GET_TASK_FAIL:
      return { loading: 'false', error: action.payload };

    default:
      return state;
  }
};

export const getUserTaskReducer = (state = { getUserTask: [] }, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_TASK_REQUEST:
      return { loading: 'true' };

    case actionTypes.GET_USER_TASK_SUCCESS:
      return { loading: 'false', tasks: action.payload };

    case actionTypes.GET_USER_TASK_FAIL:
      return { loading: 'false', error: action.payload };

    default:
      return state;
  }
};

export const deleteTaskReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.DELETE_TASK_REQUEST:
      return { loading: 'true' };

    case actionTypes.DELETE_TASK_SUCCESS:
      return { loading: 'false' };

    case actionTypes.DELETE_TASK_FAIL:
      return { loading: 'false', error: action.payload };

    default:
      return state;
  }
};

export const getAllTaskReducer = (state = { getAllTasks: [] }, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_TASK_REQUEST:
      return { loading: 'true' };

    case actionTypes.GET_ALL_TASK_SUCCESS:
      return { loading: 'false', tasks: action.payload };

    case actionTypes.GET_ALL_TASK_FAIL:
      return { loading: 'false', error: action.payload };

    default:
      return state;
  }
};

export const getTaskByIDReducer = (state = { task: [] }, action) => {
  switch (action.type) {
    case actionTypes.GET_TASK_BY_ID_REQUEST:
      return { loading: 'true' };

    case actionTypes.GET_TASK_BY_ID_SUCCESS:
      return { loading: 'false', task: action.payload };

    case actionTypes.GET_TASK_BY_ID_FAIL:
      return { loading: 'false', error: action.payload };

    default:
      return state;
  }
};

export const getTaskQueyByReducer = (state = { tasks: [] }, action) => {
  switch (action.type) {
    case actionTypes.GET_TASK_QUERY_BY_REQUEST:
      return { loading: 'true' };

    case actionTypes.GET_TASK_QUERY_BY_SUCCESS:
      return { loading: 'false', tasks: action.payload };

    case actionTypes.GET_TASK_QUERY_BY_FAIL:
      return { loading: 'false', error: action.payload };

    default:
      return state;
  }
};
export const updateTaskReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_TASK_REQUEST:
      return { loading: 'true' };

    case actionTypes.UPDATE_TASK_SUCCESS:
      return { loading: 'false' };

    case actionTypes.UPDATE_TASK_FAIL:
      return { loading: 'false', error: action.payload };

    default:
      return state;
  }
};
