import { LOAD_DEVICES } from '../constants/constants';
import { CHANGE_STATUS } from '../constants/constants';

const devicesList = (state = [], action) => {
  switch (action.type) {
    case LOAD_DEVICES:
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
    default:
      return state;
  }
};

export default devicesList;
