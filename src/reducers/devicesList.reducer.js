import { LOAD_DEVICES_SUCCESS } from '../constants/index';
import { CHANGE_STATUS } from '../constants/index';
import { DELETE_DEVICE } from '../constants/index';
import { SEARCH_ITEM } from '../constants/index';
import { CHANGE_FILTER_OPTION } from '../constants/index';

const initialState = {
  filterOption: 'all',
  searchValue: ''
};

export const devicesList = (state = [], action) => {
  switch (action.type) {
    case LOAD_DEVICES_SUCCESS:
      return action.devices.map((item) => (
        Object.assign({}, item)
      ));
    case CHANGE_STATUS: {
      const newState = state.map((item) => (
        Object.assign({}, item)
      ));

      newState.map((item, i) => {
        if (item.id === action.id) {
          newState[i].status = !newState[i].status;
        }
      });
      return newState;
    }
    case DELETE_DEVICE: {
      const newDevices = state.filter((item) =>{
        return item.id !== action.id;
      });

      return newDevices;
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
