import { CHANGE_STATUS } from '../constants/index';

export const changeStatus = (id) => ({
  type: CHANGE_STATUS,
  id
});
