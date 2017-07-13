import {
  ADD_ITEM,
  DELETE_ITEM,
  SET,
  RESET_DEVICE_BUILDER_FORM,
  ADD_DEVICE,
  ADD_DEVICE_SUCCESS,
  ADD_DEVICE_FAILURE,
  ADD_ITEM_DESCRIPTION
} from '../constants/index';

const initialState = {
  uploadStatus:'',
  device:{
    name: '',
    location: 'living room',
    items: []
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return Object.assign({}, state, {
        device:{
          ...state.device,
          items:[...state.device.items, action.item]
        }
      });
    case SET:
      return Object.assign({}, state, {
        device:{
          ...state.device,
          [action.name]: action.value
        }
      });
    case RESET_DEVICE_BUILDER_FORM:
      return initialState;
    case DELETE_ITEM:
      return ({
        ...state,
        device:{
          ...state.device,
          items:state.device.items.filter((item, i) => action.id !== i)
        }
      });
    case ADD_DEVICE:
      return Object.assign({}, state, { uploadStatus:'PENDING' });
    case ADD_DEVICE_SUCCESS:
      return Object.assign({}, state, { uploadStatus:'DONE' });
    case ADD_DEVICE_FAILURE:
      return Object.assign({}, state, { uploadStatus:'FAIL' });
    case ADD_ITEM_DESCRIPTION:
      return ({
        ...state,
        device:{
          ...state.device,
          items:state.device.items.map((item, i) => {
            if (i === action.id) {
              item.description = action.value;
            }
            return item;
          })
        }
      });
    default:
      return state;
  }
};

export default reducer;
