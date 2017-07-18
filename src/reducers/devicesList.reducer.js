import { LOAD_DEVICES_SUCCESS } from '../constants/index';
import { CHANGE_STATUS } from '../constants/index';
import { DELETE_DEVICE, LOAD_DEVICE,
        LOAD_DEVICE_SUCCESS,
        LOAD_DEVICE_PENDING
       } from '../constants/index';
import { LIST_SET_ITEM_VALUE } from '../constants/index';
import { SEARCH_ITEM } from '../constants/index';
import { CHANGE_FILTER_OPTION } from '../constants/index';

const initialState = {
  filterOption: 'all',
  searchValue: ''
};

export const devicesList = (state = {
  device:{ items:[] },
  devices:[], pending: false, loadFailed: false }, action) => {
  switch (action.type) {
    case LOAD_DEVICES_SUCCESS:
      return { ...state, pending: false,
        devices:action.devices.map((item) => (
        Object.assign({}, item)
      )) };

    case LOAD_DEVICE: {
      const device = state.devices.filter((item) => {
        return item.id === action.id;
      })[0];

      const devices = Object.assign([], state.devices, device);

      return { ...state, device, devices };
    }

    case LOAD_DEVICE_SUCCESS: {
      return { ...state, device: action.device };
    }

    case CHANGE_STATUS: {
      const devices = state.devices.map((item, index) => {
        if (item.id === action.id) {
          return Object.assign({}, item, { status:action.status });
        }
        return item;
      });

      if (state.device.id === action.id) {
        return {
          ...state,
          devices:devices,
          device:{ ...state.device, status:action.status }
        };
      }

      return { ...state, devices:devices };
    }

    case LOAD_DEVICE_PENDING: {
      return { ...state, pending: true };
    }

    case DELETE_DEVICE: {
      const newDevices = state.devices.filter((item) =>{
        return item.id !== action.id;
      });

      return { ...state, devices:newDevices };
    }
    case LIST_SET_ITEM_VALUE: {
      const device = state.device;

      device.items = device.items.map((item, i) => {
        if (i === action.id) {
          item.data = action.value;
        }
        return item;
      });
      return { ...state, device };
    }
    case 'ADD_DEVICE_TO_LIST': {
      const devices = Object.assign([], state.devices);

      devices.push(action.device);
      return { ...state, devices };
    }
    case 'LOAD_DEVICES_FAILURE': {
      return { ...state, loadFailed: true };
    }
    default:
      return state;
  }
};

export const searchAndFilter = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_FILTER_OPTION:
      return Object.assign({}, state, { filterOption: action.filterOption });
    case SEARCH_ITEM:
      return Object.assign({}, state, { searchValue: action.searchValue });
    default:
      return state;
  }
};
