import reducer from '../../reducers/auth.reducer';
import {
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  CLEAR_LOGIN_STATUS,
  REGISTRATION_ATTEMPT,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGOUT_PENDING,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  LOAD_LOGGED_USER,
  DELETE_USER_PROFILE_SUCCESS
} from '../../constants/index';

const initialState = {
  status: '',
  errorText: '',
  isLogged: null
};

const user = {
  _id: '599bdfb1ce8fd10c4550fd59',
  name: 'Name',
  email: 'email@gmail.com',
  created: '2017-08-22T07:39:29.538Z'
};

describe (`Auth Reducer`, () => {
  it('returns an empty array as default state', () => {
    const action = {type: 'unknown'};
    const newState = reducer(undefined, {type: 'unknown'});

    expect(newState).toEqual(initialState);
  });

  it(`reducer for LOGIN_PENDING`, () => {
    const action = {
      type: LOGIN_PENDING,
      response: { status: 'PENDING' }
    };
    const newState = reducer(initialState, action);
    const stateAfter = {...initialState};
    stateAfter.status = 'PENDING';

    expect(newState).toEqual(stateAfter);
  });

  it(`reducer for LOGIN_SUCCESS`, () => {
    const user = user;
    const action = {
      type: LOGIN_SUCCESS,
      response: { status: 'DONE', user }
    };
    const newState = reducer(initialState, action);
    const stateAfter = {...initialState};
    stateAfter.status = 'DONE';
    stateAfter.isLogged = user;

    expect(newState).toEqual(stateAfter);
  });

  it(`reducer for LOGIN_FAILURE`, () => {
    const action = {
      type: LOGIN_FAILURE,
      errorText: 'Some error text'
    };
    const newState = reducer(initialState, action);
    const stateAfter = {...initialState};
    stateAfter.status = 'FAIL';
    stateAfter.isLogged = null;
    stateAfter.errorText = 'Some error text';

    expect(newState).toEqual(stateAfter);
  });

  it(`reducer for REGISTRATION_ATTEMPT`, () => {
    const action = {
      type: REGISTRATION_ATTEMPT,
      response: { status: 'PENDING' }
    };
    const newState = reducer(initialState, action);
    const stateAfter = {...initialState};
    stateAfter.status = 'PENDING';

    expect(newState).toEqual(stateAfter);
  });

  it(`reducer for REGISTER_SUCCESS`, () => {
    const user = user;
    const action = {
      type: REGISTER_SUCCESS,
      response: { status: 'DONE', user }
    };
    const newState = reducer(initialState, action);
    const stateAfter = {...initialState};
    stateAfter.status = 'DONE';
    stateAfter.isLogged = user;

    expect(newState).toEqual(stateAfter);
  });

  it(`reducer for REGISTER_FAILURE`, () => {
    const action = {
      type: REGISTER_FAILURE,
      errorText: 'Some error text'
    };
    const newState = reducer(initialState, action);
    const stateAfter = {...initialState};
    stateAfter.status = 'FAIL';
    stateAfter.errorText = 'Some error text';

    expect(newState).toEqual(stateAfter);
  });

  it(`reducer for LOGOUT_PENDING`, () => {
    const action = {
      type: LOGOUT_PENDING,
      response: { status: 'PENDING' }
    };
    const newState = reducer(initialState, action);
    const stateAfter = {...initialState};
    stateAfter.status = 'PENDING';

    expect(newState).toEqual(stateAfter);
  });

  it(`reducer for LOGOUT_SUCCESS`, () => {
    const action = {
      type: LOGOUT_SUCCESS
    };
    const newState = reducer(initialState, action);
    const stateAfter = {...initialState};

    expect(newState).toEqual(stateAfter);
  });

  it(`reducer for LOGOUT_FAILURE`, () => {
    const action = {
      type: LOGOUT_FAILURE,
      errorText: 'Some error text'
    };
    const newState = reducer(initialState, action);
    const stateAfter = {...initialState};
    stateAfter.status = 'FAIL';
    stateAfter.errorText = 'Some error text';

    expect(newState).toEqual(stateAfter);
  });

  it(`reducer for LOAD_LOGGED_USER`, () => {
    const action = {
      type: LOAD_LOGGED_USER,
      response: { status: 'PENDING' }
    };
    const newState = reducer(initialState, action);
    const stateAfter = {...initialState};
    stateAfter.status = 'PENDING';

    expect(newState).toEqual(stateAfter);
  });

  it(`reducer for DELETE_USER_PROFILE_SUCCESS`, () => {
    const action = {
      type: DELETE_USER_PROFILE_SUCCESS
    };
    const newState = reducer(initialState, action);
    const stateAfter = {...initialState};

    expect(newState).toEqual(stateAfter);
  });

  it(`reducer for CLEAR_LOGIN_STATUS`, () => {
    const action = {
      type: CLEAR_LOGIN_STATUS
    };
    const newState = reducer(initialState, action);
    const stateAfter = {...initialState};

    expect(newState).toEqual(stateAfter);
  });
});
