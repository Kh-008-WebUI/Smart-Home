import {
  NOTIFICATIONS_FETCH_SUCCESS,
  NOTIFICATIONS_CHANGE_STATUS,
  NOTIFICATIONS_FETCH_FAILURE,
  ADD_NOTIFICATION_SUCCESS,
  NOTIFICATIONS_CHANGE_STATUS_SUCCESS
} from '../constants/index';

const notifications = (state = {
  notifications: [],
  loadNotifacationsStatus: ''
}, action) => {
  switch (action.type) {
    case NOTIFICATIONS_FETCH_SUCCESS: {
      return { ...state, ...action, loadNotifacationsStatus: 'DONE' };
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

      newNotifications.push(action.notification.notification);

      return { ...state, notifications:newNotifications };
    }
    default:
      return state;
  }
};

export default notifications;

