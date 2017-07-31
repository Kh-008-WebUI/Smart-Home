import { LOAD_USERS_SUCCESS, LOAD_USERS_FAILURE,
  UPDATE_USERS_REQUEST, DISPLAY_USERS_STATUS }
from '../constants/index';

export const loadUsersReducer = (state = { users: [],
  loadUsersStatus: '', displayUsersStatus: true }, action) => {
  switch (action.type) {
    case LOAD_USERS_SUCCESS: {
      return Object.assign(
        {},
        state,
        { users: action.payload },
        { loadUsersStatus: 'DONE' }
      );
    }
    case LOAD_USERS_FAILURE: {
      return Object.assign({}, state, { loadUsersStatus: 'ERROR' });
    }
    case UPDATE_USERS_REQUEST: {
      return Object.assign({}, state, { loadUsersStatus: 'PENDING' });
    }
    case DISPLAY_USERS_STATUS: {
      return Object.assign({}, state, { displayUsersStatus: action.payload });
    }
    default:
      return state;
  }
};


