import { combineReducers } from 'redux';
import builder from './builder.reducer';
import {
  devicesList,
  searchAndFilter } from './devicesList.reducer';
import { users } from './users.reducer';
import notificationsReducer from './notifications.reducer';
import authentication from './auth.reducer';
import ws from './ws.reducer';

const rootReducer = combineReducers({
  searchAndFilter,
  builder,
  devicesList,
  users,
  notificationsReducer,
  authentication,
  ws
});

export default rootReducer;
