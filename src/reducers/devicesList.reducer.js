import { LOAD_DEVICES_SUCCESS } from '../constants/index';
import { CHANGE_STATUS } from '../constants/index';
import { DELETE_DEVICE } from '../constants/index';

const devicesList = (state = [], action) => {
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
    case 'LIST_SET_ITEM_VALUE':
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
    default:
      return state;
  }
};

export default devicesList;
