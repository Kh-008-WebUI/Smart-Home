const initialState = {
  status:''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_DEVICE':
      return Object.assign({}, state, { status:'PENDING' });
    case 'ADD_DEVICE_SUCCESS':
      return Object.assign({}, state, { status:'DONE' });
    case 'ADD_DEVICE_FAILURE':
      return Object.assign({}, state, { status:'FAIL' });
    case 'CLEAR_DEVICE_STATUS':
      return Object.assign({}, state, { status:'' });
    default:
      return state;
  }
};

export default reducer;
