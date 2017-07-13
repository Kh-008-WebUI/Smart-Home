import { LOAD_DEVICES_SUCCESS } from '../constants/index';
import { CHANGE_STATUS } from '../constants/index';
import { DELETE_DEVICE, LOAD_DEVICE } from '../constants/index';
import { SEARCH_ITEM } from '../constants/index';
import { CHANGE_FILTER_OPTION } from '../constants/index';

const initialState = {
  filterOption: 'all',
  searchValue: ''
};

export const devicesList = (state = {
  device:{ items:[] },
  devices:[], pending: false }, action) => {
  switch (action.type) {
    case LOAD_DEVICES_SUCCESS:
      return { ...state, pending: false, devices:action.devices.map((item) => (
        Object.assign({}, item)
      )) };
    case 'LOAD_DEVICE': {
      const device = state.devices.filter((item) =>{
        return item.id === action.id;
      })[0];

      return { ...state, device };
    }
    case 'LOAD_DEVICE_SUCCESS': {
      return { ...state, device: action.device };
    }

    case CHANGE_STATUS: {
      const newState = state.devices.map((item) => (
        Object.assign({}, item)
      ));

      newState.map((item, i) => {
        if (item.id === action.id) {
          newState[i].status = !newState[i].status;
        }
      });
      return newState;
    }
    case 'LOAD_DEVICE_PENDING': {
      return { ...state, pending: true };
    }
    case DELETE_DEVICE: {
      const newDevices = state.devices.filter((item) =>{
        return item.id !== action.id;
      });

      return { ...state, devices:newDevices };
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
