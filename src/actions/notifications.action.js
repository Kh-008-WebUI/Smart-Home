import {
  NOTIFICATIONS_FETCH_SUCCESS,
  NOTIFICATIONS_FETCH_REQUESTED,
  NOTIFICATIONS_CHANGE_STATUS,
  NOTIFICATIONS_FETCH_FAILURE,
  ADD_NOTIFICATION_SUCCESS,
  ADD_NOTIFICATIONS,
  SEND_NOTIFICATION_WS,
  NOTIFICATIONS_CHANGE_STATUS_SUCCESS,
  NOTIFICATIONS_ALL_CHANGE_STATUS,
  NOTIFICATIONS_SHOW_ALL_HISTORY
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

export const changeStatusNotification = (id, viewed) => {
  return {
    type: NOTIFICATIONS_CHANGE_STATUS,
    id,
    viewed
  };
};

export const changeStatusNotificationSuccess = (notification) => {
  return {
    type: NOTIFICATIONS_CHANGE_STATUS_SUCCESS,
    notification
  };
};

export const changeStatusAllNotifications = () => {
  return {
    type: NOTIFICATIONS_ALL_CHANGE_STATUS
  };
};

export const showAllHistoryNotifications = () => {
  return {
    type: NOTIFICATIONS_SHOW_ALL_HISTORY
  };
};

export const addNotificationsSuccess = (notification) => {
  return {
    type: ADD_NOTIFICATION_SUCCESS,
    notification
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
