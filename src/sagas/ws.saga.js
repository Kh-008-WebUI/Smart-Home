import {
  WS_MESSAGE
} from '../constants/index';
import { updateChart, updateChat } from '../actions/ws.action';
import { fetchNotificationsRequest } from '../actions/notifications.action';
import { updateUsersOnline } from '../actions/users.action';
import { all, takeEvery, put, call } from 'redux-saga/effects';

export function* wsMessage (action) {
  switch (action.msg.type) {
    case 'chart':
      yield put(updateChart(action.msg.data));
      break;
    case 'notification':
      yield put(fetchNotificationsRequest());
      break;
    case 'users':
      yield put(updateUsersOnline(action));
      break;
    case 'chat':
      yield put(updateChat(action.msg.data));
      break;
    default:
      break;
  }
}


export function* watchWS () {
  yield takeEvery(WS_MESSAGE, wsMessage);
}
