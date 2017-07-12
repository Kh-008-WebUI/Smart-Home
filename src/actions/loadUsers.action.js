import { UPDATE_CURRENT_USERS, UPDATE_CURRENT_REQUEST }
from '../constants/constants';

export const loadUsersSuccess = (payload) => {
  return {
    type: UPDATE_CURRENT_USERS,
    payload
  };
};

export const loadUsersRequest = () => {
  return {
    type: UPDATE_CURRENT_REQUEST
  };
};
