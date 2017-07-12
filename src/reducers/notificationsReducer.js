const notifications = (state = [], action) => {
  switch (action.type) {
    case 'NOTIFICATIONS_FETCH_SUCCEEDED': {
      return [
        ...action.notifications
      ];
    }
    default:
      return state;
  }
};

export default notifications;

