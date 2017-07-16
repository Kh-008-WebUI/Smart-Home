import { LOAD_USERS_SUCCESS, LOAD_USERS_FAILURE } from '../constants/index';

export const loadUsersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case 'LOAD_USERS_SUCCESS': {
      return Object.assign({}, state, action.payload);
    }
    case 'LOAD_USERS_FAILURE': {
      return Object.assign({}, state, action.payload);
    }

    default:
      return state;
  }
};


