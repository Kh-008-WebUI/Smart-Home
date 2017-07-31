import {
  NOTIFICATIONS_FETCH_SUCCESS,
  NOTIFICATIONS_CHANGE_STATUS,
  NOTIFICATIONS_FETCH_FAILURE,
  ADD_NOTIFICATION_SUCCESS
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
    case NOTIFICATIONS_CHANGE_STATUS: {
      const item = state.notifications[action.payload];
      const newNotifications = state.notifications.slice();

      newNotifications[action.payload] = { ...item, viewed: true };
      return { ...state, notifications: newNotifications };
    }
    case ADD_NOTIFICATION_SUCCESS: {
      const newNotifications = [...state.notifications];

      newNotifications.push(action.notification.notification);

      return { ...state, notifications:newNotifications };
    }
     case 'NOTIFICATIONS_CHANGE_STATUS_SUCCESS': {
      newStatus: [...state. notification, viewed]
      return { ...state, notifications:newNotifications };
    }


    default:
      return state;
  }
};

export default notifications;

