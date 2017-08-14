import {
  UPDATE_CHART,
  WS_MESSAGE
} from '../constants/index';

export const updateChart = (data) => ({
  type: UPDATE_CHART,
  data
});

export const wsMessage = (msg) => ({
  type: WS_MESSAGE,
  msg
});
