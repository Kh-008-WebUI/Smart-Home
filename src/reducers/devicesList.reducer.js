import { LOAD_DEVICES_SUCCESS } from '../constants/index';
import { CHANGE_STATUS } from '../constants/index';
import { DELETE_DEVICE, LOAD_DEVICE } from '../constants/index';

const devicesList = (state = {
  device:{ items:[] },
  devices:[] }, action) => {
  switch (action.type) {
    case LOAD_DEVICES_SUCCESS:
      return { ...state, devices:action.devices.map((item) => (
        Object.assign({}, item)
      )) };
    case 'LOAD_DEVICE': {
      let device = state.devices.filter((item) =>{
        return item.id === action.id;
      })[0];

      return { ...state, device };
    }
    case 'LOAD_DEVICE_SUCCESS': {
      return { ...state, device: action.device };
    }

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
      const newDevices = state.devices.filter((item) =>{
        return item.id !== action.id;
      });

      return { ...state, devices:newDevices };
    }
    default:
      return state;
  }
};

export default devicesList;
