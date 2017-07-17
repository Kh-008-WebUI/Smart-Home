import {
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  CLEAR_LOGIN_STATUS,
  REGISTER_PENDING,
  REGISTER_SUCCESS,
  REGISTER_FAILURE
} from '../constants/index';

const initialState = {
  loginStatus: '',
  isLogged: true,
  user: {
    username:'',
    password:'',
    passwordRepeat:'',
    email:''
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_PENDING:
      return { ...state, loginStatus:'PENDING' };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginStatus:'DONE',
        isLogged: action.status
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loginStatus:'FAIL',
        isLogged: action.status
      };
    case CLEAR_LOGIN_STATUS:
      return { ...state, loginStatus:'' };
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: action.userData
      };
    default:
      return state;
  }
};

export default reducer;
