import { NOTIFICATIONS_FETCH_SUCCESS,
  NOTIFICATIONS_CHANGE_STATUS } from '../constants/index';

const notifications = (state = [], action) => {
  switch (action.type) {
    case NOTIFICATIONS_FETCH_SUCCESS: {
      return [ ...action.notifications];
    }
    case NOTIFICATIONS_CHANGE_STATUS: {
      const item = state[action.payload];

      item.viewed = true;
      return [...state, ...item];
    }
    default:
      return state;
  }
};

export default notifications;

