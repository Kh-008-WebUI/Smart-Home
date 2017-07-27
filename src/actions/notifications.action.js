import {
  NOTIFICATIONS_FETCH_SUCCESS, NOTIFICATIONS_FETCH_REQUESTED,
  NOTIFICATIONS_CHANGE_STATUS, NOTIFICATIONS_FETCH_FAILURE
 }
from '../constants/index';

export const fetchNotificationsSuccess = (notifications) => {
  return {
    type: NOTIFICATIONS_FETCH_SUCCESS,
    notifications
  };
};

export const fetchNotificationsFailed = (payload) => {
  return {
    type: NOTIFICATIONS_FETCH_FAILURE,
    payload
  };
};

export const fetchNotificationsRequest = () => {
  return {
    type: NOTIFICATIONS_FETCH_REQUESTED
  };
};

export const changeStatusNotification = (payload) => {
  return {
    type: NOTIFICATIONS_CHANGE_STATUS,
    payload
  };
};

export const addNotificationsSuccess = (notification) => {
  return {
    type: 'ADD_NOTIFICATION_SUCCESS',
    notification
  };
};

export const fetchAddNotifications = (message) => {
  return {
    type: 'ADD_NOTIFICATIONS',
    message
  };
};
