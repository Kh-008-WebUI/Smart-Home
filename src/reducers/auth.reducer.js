import {
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  CLEAR_LOGIN_STATUS,
  REGISTRATION_ATTEMPT,
  REGISTER_SUCCESS,
  REGISTER_FAILURE
} from '../constants/index';

const initialState = {
  loginStatus: '',
  isLogged: false,
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
    case REGISTRATION_ATTEMPT:
      return { ...state, loginStatus: 'PENDING' };
    case REGISTER_SUCCESS:
      return { ...state, user: action.userData, loginStatus: 'DONE' };
    case REGISTER_FAILURE:
      return { ...state, loginStatus: 'FAIL' };
    default:
      return state;
  }
};

export default reducer;
