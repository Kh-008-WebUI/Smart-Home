import {
  NOTIFICATIONS_FETCH_SUCCESS,
  NOTIFICATIONS_FETCH_REQUESTED,
  NOTIFICATIONS_CHANGE_STATUS,
  NOTIFICATIONS_FETCH_FAILURE,
  ADD_NOTIFICATION_SUCCESS,
  ADD_NOTIFICATIONS,
  SEND_NOTIFICATION_WS
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

export const changeStatusNotification = (id, status) => {
  return {
    type: NOTIFICATIONS_CHANGE_STATUS,
    id,
    status
  };
};

export const addNotificationsSuccess = (notification) => {
  return {
    type: ADD_NOTIFICATION_SUCCESS,
//    id,
    status
  };
};

export const fetchAddNotifications = (message) => {
  return {
    type: ADD_NOTIFICATIONS,
    message
  };
};

export const sendNotificationWS = (message) => {
  return {
    type: SEND_NOTIFICATION_WS,
    message
  };
};

export const statusNotifications = (notification) => {
  return {
    type: 'NOTIFICATIONS_CHANGE_STATUS_SUCCESS',
    notification
  };
};