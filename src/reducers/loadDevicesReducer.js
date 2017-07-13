const loadDevicesReducer = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_DASH_DEVICE': {
      return Object.assign({}, state, action.payload);
    }
    default:
      return state;
  }
};

export default loadDevicesReducer;

