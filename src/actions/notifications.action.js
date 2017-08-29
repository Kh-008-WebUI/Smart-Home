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
  NOTIFICATIONS_SHOW_ALL_HISTORY,
  UNREAD_NOTIFICATIONS_COUNT_REQUESTED,
  UNREAD_NOTIFICATIONS_COUNT_FETCH_SUCCESS,
  UNREAD_TODAYS_NOTIFICATIONS_REQUESTED,
  ALL_TODAYS_NOTIFICATIONS_REQUESTED
 }
from '../constants/index';

export const fetchNotificationsSuccess = (
  notifications,
  itemsPerPage,
  reload) => {
  return {
    type: NOTIFICATIONS_FETCH_SUCCESS,
    notifications,
    itemsPerPage,
    reload
  };
};

export const fetchNotificationsFailed = (payload) => {
  return {
    type: NOTIFICATIONS_FETCH_FAILURE,
    payload
  };
};

export const fetchNotificationsRequest = (
  pageNumber,
  itemsPerPage,
  reload = false,
  unreadOnly = true) => {
  return {
    type: NOTIFICATIONS_FETCH_REQUESTED,
    pageNumber,
    itemsPerPage,
    reload,
    unreadOnly
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

export const requestUnreadNotificationsCount = () => {
  return {
    type: UNREAD_NOTIFICATIONS_COUNT_REQUESTED
  };
};

export const requestUnreadNotificationsCountSuccess = ({ unreadCount }) => {
  return {
    type: UNREAD_NOTIFICATIONS_COUNT_FETCH_SUCCESS,
    unreadCount
  };
};

// export const requestTodaysUnreadNotifications = ({ unread }) => {
//   return {
//     type: UNREAD_TODAYS_NOTIFICATIONS_REQUESTED,
//     unread
//   };
// };

// export const requestAllTodaysNotifications = ({ notificationsOfToday }) => {
//   return {
//     type: ALL_TODAYS_NOTIFICATIONS_REQUESTED,
//     notificationsOfToday
//   };
// };
