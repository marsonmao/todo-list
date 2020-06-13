/* eslint-disable camelcase */
import { combineReducers } from 'redux';
import uuid from 'uuid/v4';

export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const CHECK_TODO = 'CHECK_TODO';
export const CLEAR_LOCAL_STORAGE = 'CLEAR_LOCAL_STORAGE';
export const SET_LOADING = 'SET_LOADING';

export const addTodo = payload => ({
  type: ADD_TODO,
  payload,
});

export const deleteTodo = id => ({
  type: DELETE_TODO,
  id,
});

export const checkTodo = id => ({
  type: CHECK_TODO,
  id,
});

export const clearLocalStorage = () => ({
  type: CLEAR_LOCAL_STORAGE,
});

export const setLoading = isLoading => ({
  type: SET_LOADING,
  isLoading,
});

function todos(state = {}, action) {
  switch (action.type) {
    case ADD_TODO: {
      const newId = uuid();
      const {
        id,
        title = 'Title',
        description = 'Description',
        created_at,
        checked,
      } = action.payload;
      return {
        ...state,
        [newId]: {
          id: id || newId,
          title,
          description,
          checked: checked || false,
          created_at: created_at || Date.now(),
        },
      };
    }
    case DELETE_TODO: {
      const { [action.id]: toDelete_, ...others } = state;
      return others;
    }
    case CHECK_TODO: {
      const { [action.id]: toCheck, ...others } = state;
      return {
        ...others,
        [action.id]: {
          ...toCheck,
          checked: true,
        },
      };
    }
    default:
      return state;
  }
}

function global(
  state = {
    isLoading: true,
  },
  action,
) {
  switch (action.type) {
    case SET_LOADING: {
      return {
        ...state,
        isLoading: action.isLoading,
      };
    }
    default:
      return state;
  }
}

export default combineReducers({
  global,
  todos,
});
