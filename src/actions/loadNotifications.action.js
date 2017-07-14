import { NOTIFICATIONS_FETCH_SUCCESS, NOTIFICATIONS_FETCH_REQUESTED }
from '../constants/index';

export const fetchNotificationsSuccess = (notifications) => {
  return {
    type: 'NOTIFICATIONS_FETCH_SUCCESS',
    notifications
  };
};

export const fetchNotificationsRequest = () => {
  return {
    type: 'NOTIFICATIONS_FETCH_REQUESTED'
  };
};

export const fetchNotificationsFailed = (notifications) => {
  return {
    type: 'NOTIFICATIONS_FETCH_FAILED',
    notifications
  };
};

