import axios from 'axios';
import * as action from '../constant/taskConstant.js';

const URL = 'http://localhost:8000/api/v1/task';

const account = JSON.parse(localStorage.getItem('userInfo'));

const accessToken = account?.accessToken;

export const addTask = (task) => async (dispatch) => {
  try {
    dispatch({ type: action.ADD_TASK_REQUEST });

    const { data } = await axios.post(`${URL}/create`, task, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    dispatch({ type: action.ADD_TASK_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: action.ADD_TASK_FAIL, payload: error.message });
  }
};

export const getTask = () => async (dispatch) => {
  try {
    dispatch({ type: action.GET_TASK_REQUEST });

    const { data } = await axios.get(`${URL}/dashboard`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    dispatch({ type: action.GET_TASK_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: action.GET_TASK_FAIL, payload: error.message });
  }
};

export const getUserTask = () => async (dispatch) => {
  try {
    dispatch({ type: action.GET_USER_TASK_REQUEST });

    const { data } = await axios.get(`${URL}/get-task`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    dispatch({ type: action.GET_USER_TASK_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: action.GET_USER_TASK_FAIL, payload: error.message });
  }
};

export const deleteTask = (id) => async (dispatch) => {
  try {
    dispatch({ type: action.DELETE_TASK_REQUEST });
    await axios.delete(`${URL}/deletetask/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    dispatch({ type: action.DELETE_TASK_SUCCESS });
  } catch (error) {
    dispatch({ type: action.DELETE_TASK_FAIL, payload: error.message });
  }
};

export const getAllAdminTask = () => async (dispatch) => {
  try {
    dispatch({ type: action.GET_ALL_TASK_REQUEST });
    const { data } = await axios.get(`${URL}/getAllTask`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    dispatch({ type: action.GET_ALL_TASK_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: action.GET_ALL_TASK_FAIL, payload: error.message });
  }
};

export const getTaskByID = (id) => async (dispatch) => {
  try {
    dispatch({ type: action.GET_TASK_BY_ID_REQUEST });
    const { data } = await axios.get(`${URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    dispatch({ type: action.GET_TASK_BY_ID_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: action.GET_TASK_BY_ID_FAIL, payload: error.message });
  }
};

export const updateTask = (id, updateTask) => async (dispatch) => {
  try {
    dispatch({ type: action.UPDATE_TASK_REQUEST });

    const { data } = await axios.put(`${URL}/update/${id}`, updateTask, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    dispatch({ type: action.UPDATE_TASK_SUCCESS });
  } catch (error) {
    dispatch({ type: action.UPDATE_TASK_FAIL, payload: error.message });
  }
};

export const getTaskByStage = (query) => async (dispatch) => {
  try {
    console.log(query);
    dispatch({ type: action.GET_TASK_QUERY_BY_REQUEST });
    const { data } = await axios.get(`${URL}/completed`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    dispatch({ type: action.GET_TASK_QUERY_BY_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: action.GET_TASK_QUERY_BY_FAIL, payload: error.message });
  }
};
