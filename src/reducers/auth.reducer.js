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
  status: '',
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
      return { ...state, status:'PENDING' };
    case LOGIN_SUCCESS:
      return {
        ...state,
        status:'DONE',
        isLogged: action.status
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        status:'FAIL',
        isLogged: action.status
      };
    case CLEAR_LOGIN_STATUS:
      return { ...state, status:'' };
    case REGISTRATION_ATTEMPT:
      return { ...state, status: 'PENDING' };
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: action.userData,
        isLogged: true,
        status: 'DONE'
      };
    case REGISTER_FAILURE:
      return { ...state, status: 'FAIL' };
    default:
      return state;
  }
};

export default reducer;
