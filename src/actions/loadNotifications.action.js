import { UPDATE_CURRENT_USERS, UPDATE_CURRENT_REQUEST }
from '../constants/constants';

export const fetchNotificationsSuccess = (notifications) => {
  return {
    type: 'NOTIFICATIONS_FETCH_SUCCEEDED',
    notifications
  };
};

export const fetchNotificationsRequest = () => {
  return {
    type: 'NOTIFICATIONS_FETCH_REQUESTED'
  };
};
