const notifications = (state = [], action) => {
  switch (action.type) {
    case 'NOTIFICATIONS_FETCH_SUCCESS': {
      return [
        ...action.notifications
      ];
    }
    case 'NOTIFICATIONS_FETCH_FAILED': {
      return [
        ...action.notifications
      ];
    }
    default:
      return state;
  }
};

export default notifications;

