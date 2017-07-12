import searchAndFilter from './searchAndFilter.reducer';
import { combineReducers } from 'redux';
import settings from './builder.reducer';
import devices from './addDevice.reducer';
import devicesList from './devicesList.reducer';
import loadUsersReducer from './loadUsersReducer';
import notificationsReduser from './notificationsReducer';
import addStatus from './addDevice.reducer';

const rootReducer = combineReducers({
  searchAndFilter,
  settings,
  devices,
  addStatus,
  devicesList,
  loadUsersReducer,
  notificationsReduser
});

export default rootReducer;
