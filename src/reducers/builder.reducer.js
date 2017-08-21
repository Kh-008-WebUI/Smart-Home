import {
  ADD_ITEM,
  DELETE_ITEM,
  SET,
  RESET_DEVICE_BUILDER_FORM,
  ADD_DEVICE,
  ADD_DEVICE_SUCCESS,
  ADD_DEVICE_FAILURE,
  ADD_ITEM_DESCRIPTION,
  SET_ITEM_VALUE,
  CLEAR_ADD_STATUS,
  UPDATE_DEVICE_SUCCESS,
  EDIT_DEVICE_SUCCESS,
  UPDATE_DEVICE_FAILURE,
  LOAD_LOCATIONS_SUCCESS,
  ADD_LOCATION_SUCCESS,
  DELETE_LOCATION_SUCCESS,
  SET_PARAMS,
  DEVICES_IN_LOCATION_SUCCESSS,
  EDIT_DEVICE_FAILURE,
  DEVICE_UPDATE_UPLOAD_STATUS_SUCCESS
} from '../constants/index';

const initialState = {
  errorText: '',
  uploadStatus:'',
  device:{
    name: '',
    location: '',
    items: []
  },
  locations: [],
  deviceInLocation: true
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
      return ({ ...state, uploadStatus:'PENDING' });
    case ADD_DEVICE_SUCCESS:
      return ({ ...state, uploadStatus:'DONE' });
    case ADD_DEVICE_FAILURE:
      return ({ ...state, uploadStatus:'FAIL', errorText: action.error });
    case CLEAR_ADD_STATUS:
      return ({ ...state, uploadStatus:'' });
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
    case SET_PARAMS:
      return {
        ...state,
        device: {
          ...state.device,
          items: state.device.items.map((item, i) => {
            if (i === action.id) {
              item.params = action.params;
            }
            return item;
          })
        }
      };
    case SET_ITEM_VALUE:
      return ({
        ...state,
        device: {
          ...state.device,
          items: state.device.items.map((item, i) => {
            if (i === action.id) {
              item.data = action.value;
            }
            return item;
          })
        }
      });
    case EDIT_DEVICE_SUCCESS:
      return {
        ...state, device: action.device
      };
    case EDIT_DEVICE_FAILURE:
      return {
        ...state,
        uploadStatus:'FAIL',
        errorText: action.errorText
      };
    case DEVICE_UPDATE_UPLOAD_STATUS_SUCCESS:
      return ({ ...state, uploadStatus:'DONE' });
    case UPDATE_DEVICE_FAILURE: {
      return {
        ...state,
        uploadStatus:'FAIL',
        errorText: action.errorText
      };
    }
    case LOAD_LOCATIONS_SUCCESS: {
      const device = Object.assign({}, state.device);

      if (device.location === '') {
        device.location = action.locations[0].label;
      }

      return {
        ...state,
        locations: action.locations,
        device
      };
    }

    case ADD_LOCATION_SUCCESS: {
      const newLocations = [...state.locations];

      newLocations.push(action.location);
      return {
        ...state,
        locations: newLocations
      };
    }
    case DELETE_LOCATION_SUCCESS: {
      const newLocations = state.locations.filter((item) => {
        return item._id !== action.id;
      });

      return {
        ...state,
        locations: newLocations
      };
    }
    case DEVICES_IN_LOCATION_SUCCESSS: {
      return {
        ...state,
        deviceInLocation: action.deviceInLocation.deviceInLocation
      };
    }
    default:
      return state;
  }
};

export default reducer;
