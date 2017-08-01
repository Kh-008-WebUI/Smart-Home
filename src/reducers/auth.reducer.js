import {
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  CLEAR_LOGIN_STATUS,
  REGISTRATION_ATTEMPT,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  UPDATE_USER_PROFILE_REQUEST,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAILURE,
  LOAD_LOGGED_USER
} from '../constants/index';

const initialState = {
  status: '',
  errorText: '',
  isLogged: {},
  user: {
    username: '',
    password: '',
    passwordRepeat: '',
    email: ''
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_PENDING:
      return { ...state, status: 'PENDING' };
    case LOGIN_SUCCESS:
      return {
        ...state,
        status: 'DONE',
        isLogged: action.user
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        status:'FAIL',
        isLogged: {},
        errorText: action.errorText
      };
    case CLEAR_LOGIN_STATUS:
      return { ...state, status: '' };
    case REGISTRATION_ATTEMPT:
      return { ...state, status: 'PENDING' };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLogged: action.user,
        status: 'DONE'
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        status: 'FAIL',
        errorText: action.errorText
      };
    case UPDATE_USER_PROFILE_REQUEST: {
      return { ...state, updateProfileStatus: 'PENDING' };
    }
    case UPDATE_USER_PROFILE_SUCCESS:
      return { ...state, user: action.payload, updateProfileStatus: 'DONE' };
    case UPDATE_USER_PROFILE_FAILURE: {
      return { ...state, updateProfileStatus: 'FAIL' };
    }
    case LOAD_LOGGED_USER:
      return { ...state, status: 'PENDING' };
    default:
      return state;
  }
};

export default reducer;
