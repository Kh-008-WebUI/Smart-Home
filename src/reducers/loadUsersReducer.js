const loadUsersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case 'UPDATE_CURRENT_USERS': {
      return Object.assign({}, state, action.payload);
    }
    default:
      return state;
  }
};

export default loadUsersReducer;

