import { LOAD_DEVICES_SUCCESS } from '../constants/index';
import { CHANGE_STATUS } from '../constants/index';
import { DELETE_DEVICE_SUCCESS,
  DELETE_DEVICE_FAIL, LOAD_DEVICE,
  LOAD_DEVICE_SUCCESS,
  LOAD_DEVICES_PENDING,
  LOAD_DEVICE_PENDING,
  LOAD_DEVICE_FAIL,
  ADD_DEVICE_TO_LIST,
  UPDATE_DEVICE_SUCCESS,
  UPDATE_DEVICE_SETTINGS_SUCCESS,
  UPDATE_DEVICE_FAILURE,
  CLEAR_STATUS
  } from '../constants/index';
import { LIST_SET_ITEM_VALUE } from '../constants/index';
import { SEARCH_ITEM } from '../constants/index';
import { CHANGE_FILTER_OPTION } from '../constants/index';

const initialState = {
  filterOption: 'all',
  searchValue: '',
  device: { items:[] },
  uploadStatus: '',
  devices: [],
  errorText: ''
};

export const devicesList = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_DEVICES_SUCCESS:
      return {
        ...state,
        uploadStatus:'DONE',
        devices:action.devices.map((item) => (
          Object.assign({}, item)
        ))
      };

    case LOAD_DEVICE: {
      const device = state.devices.filter((item) => {
        return item._id === action.id;
      })[0];

      const devices = Object.assign([],
        state.devices,
        device
      );

      return {
        ...state,
        device,
        devices
      };
    }

    case LOAD_DEVICE_SUCCESS: {
      return {
        ...state,
        device: action.device,
        uploadStatus:'DONE'
      };
    }

    case LOAD_DEVICES_PENDING: {
      return {
        ...state,
        uploadStatus:'PENDING'
      };
    }

    case LOAD_DEVICE_PENDING: {
      return {
        ...state,
        uploadStatus:'PENDING'
      };
    }

    case DELETE_DEVICE_SUCCESS: {
      const newDevices = state.devices.filter((item) =>{
        return item._id !== action.id;
      });

      return {
        ...state,
        devices:newDevices
      };
    }

    case DELETE_DEVICE_FAIL: {
      return {
        ...state,
        uploadStatus:'FAIL',
        errorText: action.errorText
      };
    }

    case UPDATE_DEVICE_SETTINGS_SUCCESS: {
      const devices = state.devices.map((device, index) => {
        if (device._id === action.device._id) {
          return action.device;
        } else {
          return device;
        }
      });

      return {
        ...state, devices, device: action.device
      };
    }

    case ADD_DEVICE_TO_LIST: {
      const devices = Object.assign([], state.devices);

      devices.push(action.device);
      return {
        ...state,
        devices
      };
    }

    case LOAD_DEVICE_FAIL: {
      return {
        ...state,
        uploadStatus:'FAIL',
        errorText: action.errorText
      };
    }

    case UPDATE_DEVICE_SUCCESS: {
      const devices = state.devices.map((device, index) => {
        if (device._id !== action.id) {
          return Object.assign({}, device);
        } else {
          return action.device;
        }
      });

      return {
        ...state,
        devices,
        device: action.device
      };
    }
    case UPDATE_DEVICE_FAILURE: {
      return {
        ...state,
        uploadStatus:'FAIL',
        errorText: action.errorText
      };
    }
    case CLEAR_STATUS:
      return { ...state, uploadStatus: '' };
    default:
      return state;
  }
};

export const searchAndFilter = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_FILTER_OPTION:
      return Object.assign({}, state, {
        filterOption: action.filterOption
      });

    case SEARCH_ITEM:
      return Object.assign({}, state, {
        searchValue: action.searchValue
      });
    default:
      return state;
  }
};
