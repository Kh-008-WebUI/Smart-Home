const loadUsersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case 'LOAD_USERS_SUCCESS': {
      return Object.assign({}, state, action.payload);
    }
    case 'LOAD_USERS_FAILED': {
      return action.payload;
    }

    default:
      return state;
  }
};

export default loadUsersReducer;

