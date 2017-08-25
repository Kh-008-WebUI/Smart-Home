import { users } from '../reducers/users.reducer';
import {
  LOAD_USERS_SUCCESS,
  LOAD_USERS_FAILURE,
  UPDATE_USERS_REQUEST,
  DISPLAY_USERS_STATUS,
  UPDATE_USER_PROFILE_REQUEST,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAILURE,
  CLEAR_UPDATE_PROFILE_STATUS } from '../constants/index';

const initialState = {
  users: [],
  loadUsersStatus: '',
  displayUsersStatus: true,
  user: {
    id: 3,
    name: 'Tom',
    email: 'tom@mail.ru',
    errorText: '' },
  errorText: ''
};

const userList = [{
  id: 0,
  name: 'George',
  home: true
},
{
  id: 1,
  name: 'Boy',
  home: false
}];

describe('Users Reducer', () => {
  it('should load users', () => {
    const expectedState = initialState;

    expectedState.users = [...userList];
    expectedState.loadUsersStatus = 'DONE';

    expect(users(initialState,
      {
        type: LOAD_USERS_SUCCESS,
        payload: userList
      })).toEqual(expectedState);
  });

  it('should fail loading users', () => {
    const expectedState = initialState;

    expectedState.errorText = 'Error text';
    expectedState.users = [];
    expectedState.loadUsersStatus = 'ERROR';

    expect(users(initialState,
      {
        type: LOAD_USERS_FAILURE,
        payload: 'Error text'
      })).toEqual(expectedState);
  });

  it('should request loading users', () => {
    const expectedState = initialState;

    expectedState.loadUsersStatus = 'PENDING';

    expect(users(initialState,
      {
        type: UPDATE_USERS_REQUEST
      })).toEqual(expectedState);
  });

  it('should change display users status', () => {
    const expectedState = initialState;

    expectedState.displayUsersStatus = false;

    expect(users(initialState,
      {
        type: DISPLAY_USERS_STATUS,
        payload: false
      })).toEqual(expectedState);
  });

  it('should request updating user profile', () => {
    const expectedState = initialState;

    expectedState.updateProfileStatus = 'PENDING';

    expect(users(initialState,
      {
        type: UPDATE_USER_PROFILE_REQUEST
      })).toEqual(expectedState);
  });

  it('should update user profile', () => {
    const expectedState = initialState;

    expectedState.user = {
      id: 3,
      name: 'Bob',
      email: 'bob@google.com'
    };
    expectedState.updateProfileStatus = 'DONE';

    expect(users(initialState,
      {
        type: UPDATE_USER_PROFILE_SUCCESS,
        payload: {
          id: 3,
          name: 'Bob',
          email: 'bob@google.com'
        }
      })).toEqual(expectedState);
  });

  it('should fail updating user profile', () => {
    const expectedState = initialState;

    expectedState.user = {
      errorText: 'Error text'
    };
    expectedState.updateProfileStatus = 'FAIL';

    expect(users(initialState,
      {
        type: UPDATE_USER_PROFILE_FAILURE,
        errorText: 'Error text'
      })).toEqual(expectedState);
  });

  it('should clear update profile status', () => {
    const expectedState = initialState;

    expectedState.updateProfileStatus = '';

    expect(users(initialState,
      {
        type: CLEAR_UPDATE_PROFILE_STATUS
      })).toEqual(expectedState);
  });
});
