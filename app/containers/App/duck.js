import { combineReducers } from "redux";
import uuid from "uuid/v4";

export const ADD_TODO = "ADD_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const CHECK_TODO = "CHECK_TODO";

export const addTodo = payload => ({
  type: ADD_TODO,
  payload
});

export const deleteTodo = id => ({
  type: DELETE_TODO,
  id
});

export const checkTodo = id => ({
  type: CHECK_TODO,
  id
});

function todos(state = {}, action) {
  switch (action.type) {
    case ADD_TODO: {
      const newId = uuid();
      const { title = "Title", description = "Description" } = action.payload;
      return {
        ...state,
        [newId]: {
          id: newId,
          title,
          description,
          checked: false,
          created_at: Date.now()
        }
      };
    }
    case DELETE_TODO: {
      const { [action.id]: toDelete, ...others } = state;
      return others;
    }
    case CHECK_TODO: {
      const { [action.id]: toCheck, ...others } = state;
      return {
        ...others,
        [action.id]: {
          ...toCheck,
          checked: true
        }
      };
    }
    default:
      return state;
  }
}

export default combineReducers({
  todos
});
