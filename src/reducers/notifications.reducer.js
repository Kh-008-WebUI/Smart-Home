import {
  NOTIFICATIONS_FETCH_SUCCESS,
  NOTIFICATIONS_CHANGE_STATUS,
  NOTIFICATIONS_FETCH_FAILURE,
  ADD_NOTIFICATION_SUCCESS,
  NOTIFICATIONS_CHANGE_STATUS_SUCCESS,
  UNREAD_NOTIFICATIONS_COUNT_FETCH_SUCCESS
} from '../constants/index';

const notifications = (state = {
  notifications: [],
  loadNotifacationsStatus: ''
}, action) => {
  switch (action.type) {
    case NOTIFICATIONS_FETCH_SUCCESS: {
      return {
        ...state,
        notifications: action.reload ?
          action.notifications :
          state.notifications.concat(action.notifications),
        timestamp: action.reload ?
          +(new Date()) :
          state.timestamp,
        loadNotifacationsStatus: 'DONE',
        willLoadMore: action.notifications.length === action.itemsPerPage
      };
    }
    case NOTIFICATIONS_FETCH_FAILURE: {
      return { ...state, loadNotifacationsStatus: 'ERROR' };
    }
    case NOTIFICATIONS_CHANGE_STATUS_SUCCESS: {
      const newNotifications = [...state.notifications];

      newNotifications.forEach((item) => {
        if (item._id === action.notification._id) {
          item.viewed = action.notification.viewed;
        }
      });
      return { ...state, notifications:newNotifications };
    }
    case ADD_NOTIFICATION_SUCCESS: {
      const newNotifications = [...state.notifications];

      newNotifications.unshift(action.notification.notification);

      return { ...state, notifications:newNotifications };
    }
    case UNREAD_NOTIFICATIONS_COUNT_FETCH_SUCCESS: {
      return {
        ...state,
        unreadCount: action.unreadCount
      };
    }
    default:
      return state;
  }
};

export default notifications;
