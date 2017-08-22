import {
  UPDATE_CHART,
  WS_MESSAGE,
  UPDATE_CHAT
} from '../constants/index';

export const updateChart = (data) => ({
  type: UPDATE_CHART,
  data
});

export const wsMessage = (msg) => ({
  type: WS_MESSAGE,
  msg
});

export const updateChat = (data) => ({
  type: UPDATE_CHAT,
  data
});
