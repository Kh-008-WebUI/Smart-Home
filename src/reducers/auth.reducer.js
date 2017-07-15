import {
  LOGIN_PENDING
} from '../constants/index';

const initialState = {
  loginStatus: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_PENDING:
      return { ...state, loginStatus:!state.loginStatus };
    default:
      return state;
  }
};

export default reducer;
