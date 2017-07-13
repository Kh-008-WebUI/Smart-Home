import { NOTIFICATIONS_FETCH_SUCCEEDED, NOTIFICATIONS_FETCH_REQUESTED }
from '../constants/index';

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
